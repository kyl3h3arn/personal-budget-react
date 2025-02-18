import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function HomePage() {
  const chartRef = useRef();
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/budget')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.budget.map(item => ({
          label: item.category,
          value: item.amount
        }));
        setBudgetData(formattedData);
      })
      .catch(error => console.error('Error loading budget data:', error));
  }, []);

  useEffect(() => {
    if (budgetData.length > 0) {
      renderChart(budgetData);
    }
  }, [budgetData]);

  function renderChart(data) {
    const width = 480;
    const height = 250;
    const radius = Math.min(width, height) / 2;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value(d => d.value);

    const arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(0);

    svg.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label));

    const legend = svg.selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(-40, ${i * 20 - radius})`);

    legend.append("rect")
      .attr("x", width / 4)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", d => color(d.label));

    legend.append("text")
      .attr("x", width / 4 + 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(d => d.label);
  }

  return (
    <main className="center" id="main">
      <section className="page-area">
        <article>
          <h2>Stay on track</h2>
          <p>
            Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
          </p>
        </article>

        <article>
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
          </p>
        </article>

        <article>
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they live happier lives... since they spend without guilt or fear... 
            because they know it is all good and accounted for.
          </p>
        </article>

        <article>
          <h2>Free</h2>
          <p>
            This app is free! And you are the only one holding your data!
          </p>
        </article>

        <article>
          <h1>Personal Budget</h1>
          <div ref={chartRef}></div>
        </article>
      </section>
    </main>
  );
}

export default HomePage;

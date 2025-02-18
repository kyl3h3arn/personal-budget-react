import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function D3Chart({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0) {
            console.warn("No data for D3 chart");
            return;
        }

        console.log("Rendering D3 Chart with:", data);

        const width = 400, height = 400, radius = Math.min(width, height) / 2;

        // Remove old SVG before re-drawing
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const pie = d3.pie().value(d => d.amount);
        const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

        // Draw pie slices
        svg.selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.category));

        // Add Legend
        const legend = svg.append("g")
            .attr("transform", `translate(-${width / 2}, ${height / 2 - 100})`);

        const legendItems = legend.selectAll(".legend-item")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "legend-item")
            .attr("transform", (d, i) => `translate(0, ${i * 20})`);

        legendItems.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", d => color(d.category));

        legendItems.append("text")
            .attr("x", 24)
            .attr("y", 14)
            .text(d => d.category)
            .style("font-size", "14px")
            .style("fill", "#333");
    }, [data]);

    return (
        <div className="chart-container">
            <h3>D3.js Pie Chart</h3>
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default D3Chart;

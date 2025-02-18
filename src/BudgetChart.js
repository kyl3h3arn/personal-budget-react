import React, { useEffect, useRef } from "react";
import { Chart, PieController, BarController, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(PieController, BarController, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BudgetChart({ data }) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        console.log("Chart Data:", data);

        // Destroy old chart if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const labels = data.map(item => item.category);
        const values = data.map(item => item.amount);

        // Set chart size constraints
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                },
            },
        };

        // Create new chart
        const newChartInstance = new Chart(chartRef.current, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: ["#ffcd56", "#ff6384", "#36a2eb", "#fd6b19", "#4bc0c0", "#9966ff", "#c9cbcf"],
                    borderWidth: 1,
                }],
            },
            options: chartOptions,
        });

        // Store chart instance
        chartInstanceRef.current = newChartInstance;

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [data]);

    return (
        <div className="chart-container">
            <h3>Pie Chart</h3>
            <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default BudgetChart;

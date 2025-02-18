import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChartComponent from "./BudgetChart";
import D3Chart from "./D3Chart";
import budgetData from "./budgetData"; // Import local data

import "./App.scss"; 
import Menu from "./Menu/Menu";
import Hero from "./Hero/Hero";
import HomePage from "./HomePage/HomePage";
import Footer from "./Footer/Footer";
import LoginPage from "./LoginPage/LoginPage";
import AboutPage from "./AboutPage/AboutPage";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            console.log("Fetched Local Data:", budgetData);
            setData(budgetData);
        }, 500);
    }, []);

    return (
        <Router>
            <Menu />
            <Hero />
            <div className="mainContainer">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>

                {data.length === 0 ? (
                    <p className="loading-text">Loading Charts...</p>
                ) : (
                    <div className="charts-container">
                        <h2>Chart.js Visualization</h2>
                        <ChartComponent data={data} />

                        <h2>D3.js Visualization</h2>
                        <D3Chart data={data} />
                    </div>
                )}
            </div>
            <Footer />
        </Router>
    );
}

export default App;

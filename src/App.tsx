import React from 'react';
import './App.css';
import FoldableSidebar from './components/FoldableSidebar';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import 'chart.js/auto'
import CashFlow from "./components/CashFlow";
import AccountManipulator from "./components/AccountManipulator"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const sidebarItems = [
    {
        title: 'Cash',
        items: ['CitiBank', 'JPMC', 'Bank of America'],
    },
    {
        title: 'Investment Balance',
        items: ['Apple', 'Tesla', 'Meta'],
    },
];

const mockNetWorthData = {
    labels: [...Array(30)].map((_, i) => `Day ${i + 1}`),
    datasets: [
        {
            label: 'Net Worth',
            data: Array.from({length: 30}, () => Math.floor(Math.random() * 20000)),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        },
    ],
};

function App() {
    return (
        <div className="app-container">
            <FoldableSidebar items={sidebarItems} />
            <div className="main-panel">
                <h2>Portfolio Management System</h2>
                <div className="stack">
                    <h3>Net Worth</h3>
                    <div className="chart-container">
                        <Line data={mockNetWorthData} options={{ maintainAspectRatio: false }} />
                    </div>
                    <CashFlow />
                    <AccountManipulator />
                </div>
            </div>
        </div>
    );
}


export default App;

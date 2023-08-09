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
import DoughnutChart from './components/DoughnutChart';

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

const mockIncomeData = {
    labels: ['CitiBank', 'JPMC', 'Bank of America'],
    datasets: [
        {
            label: 'Income',
            data: [1000, 3000, 1500], // Fake values, will use real data later
        },
    ],
};

const mockExpenditureData = {
    labels: ['CitiBank', 'JPMC', 'Bank of America'],
    datasets: [
        {
            label: 'Expenditure',
            data: [500, 2000, 800], // Fake values, will use real data later
        },
    ],
};

function App() {
    return (
        <div className="app-container">
            <FoldableSidebar items={sidebarItems} />
            <div className="main-panel">
                <h2>Portfolio Management System</h2>
                <h3>Net Worth</h3>
                <div className="stack">
                    <div className="chart-container">
                        <Line data={mockNetWorthData} options={{ maintainAspectRatio: false }} />
                    </div>
                    <DoughnutChart
                        title="Cash Flow"
                        incomeData={mockIncomeData.datasets[0].data}
                        expenditureData={mockExpenditureData.datasets[0].data}
                        labels={mockIncomeData.labels}
                    />
                </div>

            </div>
        </div>
    );
}


export default App;

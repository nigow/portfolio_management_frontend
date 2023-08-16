import React from 'react';
import './App.css';
import FoldableSidebar from './components/FoldableSidebar';
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
import TableOverview from "./components/TableOverview";

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
        items: [
            { name: 'CitiBank', amount: '$5000' },
            { name: 'JPMC', amount: '$3000' },
            { name: 'Bank of America', amount: '$7000' },
        ],
    },
    {
        title: 'Investment Balance',
        items: [
            { name: 'Apple', amount: '$10000' },
            { name: 'Tesla', amount: '$15000' },
            { name: 'Meta', amount: '$8000' },
        ],
    },
];

const calculateTotalNetWorth = () => {
    let totalNetWorth = 0;
    sidebarItems.forEach(itemGroup => {
        itemGroup.items.forEach(item => {
            const amount = parseFloat(item.amount.replace('$', '').replace(',', ''));
            totalNetWorth += amount;
        });
    });
    return totalNetWorth.toFixed(2);
};

function App() {
    return (
        <div className="app-container">
            <FoldableSidebar items={sidebarItems} totalNetWorth={calculateTotalNetWorth()} />
            <div className="main-panel">
                <h2>Portfolio Management System</h2>
                <div className="stack">
                    <TableOverview />
                    <AccountManipulator />
                    <CashFlow />
                </div>
            </div>
        </div>
    );
}


export default App;

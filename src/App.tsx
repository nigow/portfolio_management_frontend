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
import {useDispatch, useSelector} from "react-redux";
import { updateAccountData } from './slice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

function App() {
    const dispatch = useDispatch();

    const accountData = useSelector((state: {accountData: any}) => state.accountData);

    const calculateTotalNetWorth = () => {
        let totalNetWorth = 0;
        accountData.forEach((account: { items: any[]; }) => {
            account.items.forEach(item => {
                totalNetWorth += item.amount;
            });
        });
        return totalNetWorth.toFixed(2);
    };

    return (
        <div className="app-container">
            <FoldableSidebar
                accountData={accountData}
                updateAccountItem={payload => dispatch(updateAccountData(payload))}
                totalNetWorth={calculateTotalNetWorth()}
            />
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

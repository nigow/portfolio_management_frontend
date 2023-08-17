import React from 'react';
import './App.css';
import FoldableSidebar from './components/FoldableSidebar';
import CashFlow from "./components/CashFlow";
import AccountManipulator from "./components/AccountManipulator"
import TableOverview from "./components/TableOverview";


function App() {
    return (
        <div className="app-container">
            <FoldableSidebar />
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

import React, { useState } from 'react';
import './FoldableSidebar.css';
import { useSelector } from "react-redux";

interface AccountItem {
    name: string;
    amount: number;
}

interface CashAccount extends AccountItem {}

interface InvestmentAccount extends AccountItem {
    total: number;
}

const FoldableSidebar: React.FC = () => {
    const cashData = useSelector((state: {cashData: CashAccount[]}) => state.cashData);
    const investmentData = useSelector((state: {investmentData: InvestmentAccount[]}) => state.investmentData);

    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const handleItemClick = (title: string) => {
        setExpandedItem(prevExpandedItem => (prevExpandedItem === title ? null : title));
    };

    const calculateTotalNetWorth = () => {
        let totalNetWorth = 0;

        cashData.forEach((item: CashAccount) => {
            totalNetWorth += item.amount;
        });

        investmentData.forEach((item: InvestmentAccount) => {
            totalNetWorth += item.amount;
        });

        return totalNetWorth.toFixed(2);
    };

    return (
        <div className="foldable-sidebar">
            <div
                className={`sidebar-item ${expandedItem === 'Cash' ? 'expanded' : ''}`}
                onClick={() => handleItemClick('Cash')}
            >
                <div className="sidebar-item-title">Cash</div>
                {expandedItem === 'Cash' && (
                    <ul className="sub-items">
                        {cashData.map((item: CashAccount) => (
                            <li key={item.name} className="sub-item">
                                <span>{item.name}</span>
                                <span className="account-amount">${item.amount}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div
                className={`sidebar-item ${expandedItem === 'Investment Account' ? 'expanded' : ''}`}
                onClick={() => handleItemClick('Investment Account')}
            >
                <div className="sidebar-item-title">Investment Account</div>
                {expandedItem === 'Investment Account' && (
                    <ul className="sub-items">
                        {investmentData.map((item: InvestmentAccount) => (
                            <li key={item.name} className="sub-item">
                                <span>{item.name}</span>
                                <span className="account-amount">${item.amount}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="total-net-worth">
                <span>Total Net Worth:</span>
                <span className="net-worth-amount">${calculateTotalNetWorth()}</span>
            </div>
        </div>
    );
};

export default FoldableSidebar;

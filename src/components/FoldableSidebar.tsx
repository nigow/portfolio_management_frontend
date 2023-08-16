import React, { useState } from 'react';
import './FoldableSidebar.css';
import { useSelector } from "react-redux";

interface AccountItem {
    name: string;
    amount: number;
}

interface AccountBundle {
    title: string;
    items: AccountItem[];
}

const FoldableSidebar: React.FC = () => {
    const accountData: AccountBundle[] = useSelector((state: {accountData: any}) => state.accountData);

    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const handleItemClick = (title: string) => {
        setExpandedItem(prevExpandedItem => (prevExpandedItem === title ? null : title));
    };

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
        <div className="foldable-sidebar">
            {accountData.map(item => (
                <div
                    key={item.title}
                    className={`sidebar-item ${expandedItem === item.title ? 'expanded' : ''}`}
                    onClick={() => handleItemClick(item.title)}
                >
                    <div className="sidebar-item-title">{item.title}</div>
                    {expandedItem === item.title && (
                        <ul className="sub-items">
                            {item.items.map(subItem => (
                                <li key={subItem.name} className="sub-item">
                                    <span>{subItem.name}</span>
                                    <span className="account-amount">${subItem.amount}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
            <div className="total-net-worth">
                <span>Total Net Worth:</span>
                <span className="net-worth-amount">${calculateTotalNetWorth()}</span>
            </div>
        </div>
    );
};

export default FoldableSidebar;

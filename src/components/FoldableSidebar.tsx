import React, { useState } from 'react';
import './FoldableSidebar.css';

interface SidebarItem {
    title: string;
    items: { name: string; amount: string }[];
}

interface FoldableSidebarProps {
    items: SidebarItem[];
    totalNetWorth: string;
}

const FoldableSidebar: React.FC<FoldableSidebarProps> = ({ items, totalNetWorth }) => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const handleItemClick = (title: string) => {
        if (expandedItem === title) {
            setExpandedItem(null);
        } else {
            setExpandedItem(title);
        }
    };

    return (
        <div className="foldable-sidebar">
            {items.map(item => (
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
                                    <span className="account-amount">{subItem.amount}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
            <div className="total-net-worth">
                <span>Total Net Worth:</span>
                <span className="net-worth-amount">${totalNetWorth}</span>
            </div>
        </div>
    );
};

export default FoldableSidebar;

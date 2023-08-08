import React, { useState } from 'react';
import './FoldableSidebar.css';

interface SidebarItem {
    title: string;
    items: string[];
}

interface FoldableSidebarProps {
    items: SidebarItem[];
}

const FoldableSidebar: React.FC<FoldableSidebarProps> = ({ items }) => {
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
                    {item.title}
                    {expandedItem === item.title && (
                        <ul className="sub-items">
                            {item.items.map(subItem => (
                                <li key={subItem}>{subItem}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FoldableSidebar;

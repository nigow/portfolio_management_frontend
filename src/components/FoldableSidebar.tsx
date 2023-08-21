import React, {useEffect, useState} from 'react';
import './FoldableSidebar.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchInitialCashData, fetchInitialInvestmentData, loadCashData, loadInvestmentData} from "../redux/slice";
import InvestmentHistoryModal from "./InvestmentHistoryModal";

interface AccountItem {
    name: string;
    amount: number;
}

interface CashAccount extends AccountItem {}

interface InvestmentAccount  {
    ticker: string;
    amountOwned: number;
    costBasis: number;
}

const FoldableSidebar: React.FC = () => {
    const cashData = useSelector((state: {cashData: CashAccount[]}) => state.cashData);
    const investmentData = useSelector((state: {investmentData: InvestmentAccount[]}) => state.investmentData);

    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleItemClick = (title: string) => {
        setExpandedItem(prevExpandedItem => (prevExpandedItem === title ? null : title));
    };

    const handleTickerClick = (ticker: string) => {
        setSelectedTicker(ticker);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const calculateTotalNetWorth = () => {
        let totalNetWorth = 0;

        cashData.forEach((item: CashAccount) => {
            totalNetWorth += item.amount;
        });

        investmentData.forEach((item: InvestmentAccount) => {
            totalNetWorth += item.amountOwned * item.costBasis;
        });

        return totalNetWorth.toFixed(2);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // @ts-ignore
                const cashData = await dispatch(fetchInitialCashData()).unwrap();
                dispatch(loadCashData(cashData));

                // @ts-ignore
                const investmentData = await dispatch(fetchInitialInvestmentData()).unwrap();
                dispatch(loadInvestmentData(investmentData));
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [dispatch]);

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
                            <li key={item.ticker} className="sub-item">
                            <span onClick={() => handleTickerClick(item.ticker)}>
                                {item.ticker}
                            </span>
                                <span className="account-amount">${item.amountOwned * item.costBasis}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {showModal && selectedTicker && (
                <InvestmentHistoryModal
                    ticker={selectedTicker}
                    onClose={handleCloseModal}
                />
            )}
            <div className="total-net-worth">
                <span>Total Net Worth:</span>
                <span className="net-worth-amount">${calculateTotalNetWorth()}</span>
            </div>
        </div>
    );
};

export default FoldableSidebar;

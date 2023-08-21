import React, { useEffect, useState } from 'react';
import './InvestmentHistoryModal.css';

interface InvestmentHistoryModalProps {
    ticker: string;
    onClose: () => void;
}

const InvestmentHistoryModal: React.FC<InvestmentHistoryModalProps> = ({ticker, onClose}) => {
    const [transactionHistory, setTransactionHistory] = useState<
        Array<{
            stockName: string;
            amount: number;
            timestamp: string;
            buySell: string;
            price: number;
        }>
        >([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_ENDPOINT}/inventory/stock-owned/history/admin/${ticker}`)
            .then(response => response.json())
            .then(data => setTransactionHistory(data))
            .catch(error => console.error( error ));
    }, [ticker]);

    const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLElement && !event.target.closest('.modal-content')) {
            onClose();
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <div className="investment-history-modal" onClick={handleModalClick}>
            <div className="modal-content">
                <table className="transaction-table">
                    <thead>
                    <tr>
                        <th>Stock Name</th>
                        <th>Amount</th>
                        <th>Timestamp</th>
                        <th>Buy/Sell</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactionHistory.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.stockName}</td>
                            <td>{transaction.amount}</td>
                            <td>{formatTimestamp(transaction.timestamp)}</td>
                            <td>{transaction.buySell}</td>
                            <td>${transaction.price.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvestmentHistoryModal;

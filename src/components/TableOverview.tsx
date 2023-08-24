import React, { useEffect, useState } from 'react';
import './TableOverview.css';
import axios from 'axios';

interface CompanyData {
    ticker: string;
    companyName: string;
    marketCap: string;
    price: number;
    lastDayPrice: number;
    volatileStock: string;
    investorRating: string;
}

const toCamelCase = (input: string): string =>
    input
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());


const TableOverview: React.FC = () => {
    const [companyData, setCompanyData] = useState<CompanyData[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const endpoint = `${process.env.REACT_APP_ENDPOINT}/stocks`;

    useEffect(() => {
        axios
            .get(endpoint)
            .then((response) => {
                setCompanyData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, []);

    const data = process.env.REACT_APP_ENVIRONMENT === 'production' ? companyData : [];

    const columnLabels = [
        'Ticker',
        'Company Name',
        'Market Cap',
        'Price',
        'Last Day Price',
        'Volatile Stock',
        'Investor Rating',
    ];

    return (
        <div>
            <h3>Stock Data Today</h3>
            <div className="table-container">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="company-table">
                        <thead>
                        <tr>
                            {columnLabels.map((label) => (
                                <th key={label}>{label}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columnLabels.map((label) => (
                                    <td key={label}>{row[toCamelCase(label) as keyof CompanyData]}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TableOverview;

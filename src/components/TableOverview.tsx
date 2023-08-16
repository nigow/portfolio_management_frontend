import React, {useEffect, useState} from 'react';
import './TableOverview.css';
import stockData from './../stockData.json';
import axios from "axios";

interface CompanyData {
    ticker: string;
    companyName: string;
    price: number;
    lastDayPrice: number;
    percentChange: number;
}

const TableOverview: React.FC = () => {
    const [companyData, setCompanyData] = useState<CompanyData[]>([]);
    const endpoint = `${process.env.REACT_APP_ENDPOINT}/stocks`
    useEffect(() => {
        axios.get(endpoint)
            .then(response => {
                setCompanyData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const data = process.env.REACT_APP_ENVIRONMENT === "production" ? companyData : stockData;

    return (
        <div>
            <h3>Stock Data Today</h3>
            <div className="table-container">
                <table className="company-table">
                    <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Company Name</th>
                        <th>Price</th>
                        <th>Last Day Price</th>
                        <th>Percent Change</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((company: CompanyData, index: React.Key | null | undefined) => (
                        <tr key={index}>
                            <td>{company.ticker}</td>
                            <td>{company.companyName}</td>
                            <td>{company.price}</td>
                            <td>{company.lastDayPrice}</td>
                            <td>{company.percentChange}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableOverview;

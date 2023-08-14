import React, {useEffect} from 'react';
import './App.css';
import FoldableSidebar from './components/FoldableSidebar';
import { Line } from 'react-chartjs-2';
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
import DoughnutChart from './components/DoughnutChart';
import {useDispatch, useSelector} from "react-redux";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const sidebarItems = [
    {
        title: 'Cash',
        items: ['CitiBank', 'JPMC', 'Bank of America'],
    },
    {
        title: 'Investment Balance',
        items: ['Apple', 'Tesla', 'Meta'],
    },
];

const mockNetWorthData = {
    labels: [...Array(30)].map((_, i) => `Day ${i + 1}`),
    datasets: [
        {
            label: 'Net Worth',
            data: Array.from({length: 30}, () => Math.floor(Math.random() * 20000)),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        },
    ],
};

interface CashFlowData {
    labels: string[];
    data: number[];
}

function App() {
    const dispatch = useDispatch();

    const expenditureData = useSelector((state: { expenditureData: CashFlowData }) => state.expenditureData);
    const incomeData = useSelector((state: { incomeData: CashFlowData }) => state.incomeData);

    const isExpenditureDataLoaded: boolean = useSelector((state: { expenditureData: CashFlowData }) => state.expenditureData.labels.length > 0);
    const isIncomeDataLoaded: boolean = useSelector((state: { expenditureData: CashFlowData }) => state.expenditureData.labels.length > 0);

    useEffect(() => {
        if (!isExpenditureDataLoaded) {
            dispatch({ type: 'expenditureData/loadInitialData', payload: expenditureData });
        }
        if (!isIncomeDataLoaded) {
            dispatch({ type: 'incomeData/loadInitialData', payload: incomeData });
        }
    }, [dispatch, isExpenditureDataLoaded, isIncomeDataLoaded]);

    return (
        <div className="app-container">
            <FoldableSidebar items={sidebarItems} />
            <div className="main-panel">
                <h2>Portfolio Management System</h2>
                <h3>Net Worth</h3>
                <div className="stack">
                    <div className="chart-container">
                        <Line data={mockNetWorthData} options={{ maintainAspectRatio: false }} />
                    </div>
                    {isExpenditureDataLoaded && isIncomeDataLoaded ? (
                        <DoughnutChart
                            title="Cash Flow"
                            incomeData={incomeData.data}
                            expenditureData={expenditureData.data}
                            labels={expenditureData.labels}
                        />
                    ) : (
                        <p>Loading cash flow data</p>
                    )}
                </div>
            </div>
        </div>
    );
}


export default App;

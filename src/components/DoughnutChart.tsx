import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import "./DoughnutChart.css"
import { CashFlowItem } from "../redux/slice";

const generateRandomColors = (count: number) => {
    const colors = [];
    for (let _ = 0; _ < count; _++) {
        const num = Math.round(0xffffff * Math.random());
        const r = num >> 16;
        const g = num >> 8 & 255;
        const b = num & 255;
        colors.push('rgb(' + r + ', ' + g + ', ' + b + ')');
    }
    return colors;
};


interface DoughnutChartProps {
    title: string;
    incomeData: CashFlowItem[];
    expenditureData: CashFlowItem[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ title, incomeData, expenditureData }) => {
    const totalIncome = incomeData.reduce((total, item) => total + item.balance, 0);
    const totalExpenditure = expenditureData.reduce((total, item) => total + item.balance, 0);

    const incomeLabels = incomeData.map(item => item.name);
    const expenditureLabels = expenditureData.map(item => item.name);

    const randomColors = generateRandomColors(Math.max(incomeData.length, expenditureData.length));

    return (
        <div className="doughnut-chart">
            <h3>{title}</h3>
            <div className="doughnut-container">
                <div className="doughnut">
                    <Doughnut
                        data={{
                            labels: incomeLabels,
                            datasets: [
                                {
                                    data: incomeData.map(item => item.balance),
                                    backgroundColor: randomColors,
                                },
                            ],
                        }}
                        options={{
                            cutout: '65%',
                            plugins: {legend: { display: false }}
                        }}
                        width={200}
                        height={200}
                    />
                    <div className="chart-total">Total Income: ${totalIncome}</div>
                </div>
                <div className="doughnut">
                    <Doughnut
                        data={{
                            labels: expenditureLabels,
                            datasets: [
                                {
                                    data: expenditureData.map(item => item.balance),
                                    backgroundColor: randomColors,
                                },
                            ],
                        }}
                        options={{
                            cutout: '65%',
                            plugins: {legend: { display: false }}
                        }}
                        width={200}
                        height={200}
                    />
                    <div className="chart-total">Total Expenditure: ${totalExpenditure}</div>
                </div>
            </div>
        </div>
    );
};

export default DoughnutChart;

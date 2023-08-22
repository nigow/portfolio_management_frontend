import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import "./DoughnutChart.css"
import { CashFlowItem } from "../redux/slice";

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
                                    backgroundColor: ['Red', 'Blue', 'Green', 'Yellow'],
                                },
                            ],
                        }}
                        options={{
                            cutout: '65%',
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
                                    backgroundColor: ['Red', 'Blue', 'Green', 'Yellow'],
                                },
                            ],
                        }}
                        options={{
                            cutout: '65%',
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

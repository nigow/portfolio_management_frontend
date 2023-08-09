import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import "./DoughnutChart.css"

interface DoughnutChartProps {
    title: string;
    incomeData: number[];
    expenditureData: number[];
    labels: string[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ title, incomeData, expenditureData, labels }) => {
    const totalIncome = incomeData.reduce((a, b) => a + b, 0);
    const totalExpenditure = expenditureData.reduce((a, b) => a + b, 0);

    return (
        <div className="doughnut-chart">
            <h3>{title}</h3>
            <div className="doughnut-container">
                <div className="doughnut">
                    <Doughnut
                        data={{
                            labels,
                            datasets: [
                                {
                                    data: incomeData,
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
                            labels,
                            datasets: [
                                {
                                    data: expenditureData,
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

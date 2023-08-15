import React, {useEffect} from 'react';
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
import DoughnutChart from './DoughnutChart';
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


interface CashFlowData {
    labels: string[];
    data: number[];
}

function CashFlow() {
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
        <div>
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
    );
}


export default CashFlow;

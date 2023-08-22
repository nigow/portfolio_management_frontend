import React, {useEffect} from 'react';
import 'chart.js/auto'
import DoughnutChart from './DoughnutChart';
import {useDispatch, useSelector} from "react-redux";
import {
    CashFlowItem,
    fetchInitialCashFlowData,
    loadExpenditureData,
    loadIncomeData,
} from "../redux/slice";

function CashFlow() {
    const dispatch = useDispatch();

    const expenditureData = useSelector(
        (state: { expenditureData: CashFlowItem[] }) => state.expenditureData
    );
    const incomeData = useSelector(
        (state: { incomeData: CashFlowItem[] }) => state.incomeData
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                // @ts-ignore
                const result = await dispatch(fetchInitialCashFlowData()).unwrap();
                dispatch(loadExpenditureData(result[0]));
                dispatch(loadIncomeData(result[1]));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div>
            <DoughnutChart
                title="Cash Flow"
                incomeData={incomeData}
                expenditureData={expenditureData}
            />
        </div>
    );
}

export default CashFlow;

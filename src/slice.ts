import { createSlice } from '@reduxjs/toolkit';
import expenditureData from './expenditure.json';
import incomeData from './income.json';

const initialStateExpenditure = expenditureData;
const initialStateIncome = incomeData;

export const expenditureDataSlice = createSlice({
    name: 'expenditureData',
    reducers: {
        loadExpenditureData: (state, action) => {
            return action.payload;
        },
    },
    initialState: initialStateExpenditure
});

export const { loadExpenditureData } = expenditureDataSlice.actions;

export const incomeDataSlice = createSlice({
    name: 'incomeData',
    reducers: {
        loadIncomeData: (state, action) => {
            return action.payload;
        },
    },
    initialState: initialStateIncome
});

export const { loadIncomeData } = incomeDataSlice.actions;


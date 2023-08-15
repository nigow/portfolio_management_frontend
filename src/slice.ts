import {createSlice, PayloadAction} from '@reduxjs/toolkit';
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
        updateExpenditureData: (state, action: PayloadAction<{ name: string; amount: number }>) => {
            const { name, amount } = action.payload;
            const index = state.labels.findIndex(label => label === name);
            if (index !== -1) {
                state.data[index] += amount;
            }
            else {
                state.labels.push(name);
                state.data.push(amount);
            }
        },
    },
    initialState: initialStateExpenditure
});

export const { loadExpenditureData, updateExpenditureData } = expenditureDataSlice.actions;

export const incomeDataSlice = createSlice({
    name: 'incomeData',
    reducers: {
        loadIncomeData: (state, action) => {
            return action.payload;
        },
        updateIncomeData: (state, action: PayloadAction<{ name: string; amount: number }>) => {
            const { name, amount } = action.payload;
            const index = state.labels.findIndex(label => label === name);
            if (index !== -1) {
                state.data[index] += amount;
            }
            else {
                state.labels.push(name);
                state.data.push(amount);
            }
        },
    },
    initialState: initialStateIncome
});

export const { loadIncomeData, updateIncomeData } = incomeDataSlice.actions;

export const manipulateActionSlice = createSlice({
    name: 'manipulateAction',
    reducers: {
        loadIncomeData: (state, action) => {
            return action.payload;
        },
    },
    initialState: {},
});

export const manipulateAccountTypeSlice = createSlice({
    name: 'accountType',
    reducers: {
        loadIncomeData: (state, action) => {
            return action.payload;
        },
    },
    initialState: {},
});

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import expenditureData from '../json/expenditure.json';
import incomeData from '../json/income.json';
import investmentData from '../json/investment.json';
import cashData from '../json/cash.json';

const initialStateExpenditure = expenditureData;
const initialStateIncome = incomeData;
const initialStateCash = cashData;
const initialStateInvestment = investmentData;

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

interface AccountAction {
    name: string;
    amount: number;
}

export const cashSlice = createSlice({
    name: 'cashData',
    initialState: initialStateCash,
    reducers: {
        updateCashData: (state, action: PayloadAction<AccountAction>) => {
            const { name, amount } = action.payload;
            const foundItem = state.find(item => item.name === name);
            if (foundItem) {
                foundItem.amount += amount;
            } else {
                const id = 4; // TODO: do not hardcode it
                state.push({ name, amount, id });
            }
        },
        loadCashData: (state, action) => {
            return action.payload;
        },
    },
});

export const { updateCashData, loadCashData } = cashSlice.actions;


export const investmentSlice = createSlice({
    name: 'investmentData',
    initialState: initialStateInvestment,
    reducers: {
        updateInvestmentData: (state, action: PayloadAction<AccountAction>) => {
            const { name, amount } = action.payload;
            const foundItem = state.find(item => item.name === name);
            if (foundItem) {
                foundItem.amount += amount;
            } else {
                const id = 4; // TODO: do not hardcode it
                state.push({ name, amount, id });
            }
        },
        loadInvestmentData: (state, action) => {
            return action.payload;
        },
    },
});

export const { updateInvestmentData, loadInvestmentData } = investmentSlice.actions;


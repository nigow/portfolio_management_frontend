import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import expenditureData from '../json/expenditure.json';
import incomeData from '../json/income.json';
import accountData from '../json/account.json'

const initialStateExpenditure = expenditureData;
const initialStateIncome = incomeData;
const initialStateAccounts = accountData;

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

export const accountDataSlice = createSlice({
    name: 'accountData',
    reducers: {
        updateAccountData: (state, action: PayloadAction<{ title: string; updatedItem: { name: string; amount: number } }>) => {
            const { title, updatedItem } = action.payload;
            const accountType = state.find(account => account.title === title);
            if (accountType) {
                const updatedAccountType = { ...accountType };
                const itemIndex = updatedAccountType.items.findIndex(item => item.name === updatedItem.name);
                if (itemIndex !== -1) {
                    updatedAccountType.items[itemIndex].amount += updatedItem.amount;
                } else {
                    updatedAccountType.items.push(updatedItem);
                }
                const accountIndex = state.findIndex(account => account.title === title);
                state[accountIndex] = updatedAccountType;
            }
        },
        loadAccountData: (state, action) => {
            return action.payload;
        },
    },
    initialState: initialStateAccounts,
});

export const { updateAccountData, loadAccountData } = accountDataSlice.actions;

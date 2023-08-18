import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import expenditureData from '../json/expenditure.json';
import incomeData from '../json/income.json';
import investmentData from '../json/investment.json';

const initialStateExpenditure = expenditureData;
const initialStateIncome = incomeData;
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

export const fetchInitialCashData = createAsyncThunk<CashItem[], void>(
    'cashData/fetchInitialCashData',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/cash`);
            const data: CashItem[] = await response.json();

            const mappedData = data.map(item => ({
                ...item,
                amount: item.balance,
            }));

            return mappedData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

interface CashAction {
    name: string;
    balance: number;
}

interface CashItem {
    id: number;
    name: string;
    balance: number;
}

const cashInitialState: CashItem[] = [];

export const cashSlice = createSlice({
    name: 'cashData',
    initialState: cashInitialState,
    reducers: {
        updateCashData: (state, action: PayloadAction<CashAction>) => {
            const { name, balance } = action.payload;
            const foundItem = state.find(item => item.name === name);
            if (foundItem) {
                foundItem.balance += balance;
            }
            else {
                const id = 4; // TODO: do not hardcode it
                state.push({ name, balance, id });
            }
        },
        loadCashData: (state, action) => {
            return action.payload;
        },
    },
});

export const { updateCashData, loadCashData } = cashSlice.actions;

interface InvestmentAction {
    name: string;
    amount: number;
}

interface InvestmentItem {
    id: number;
    name: string;
    balance: number;
}


export const investmentSlice = createSlice({
    name: 'investmentData',
    initialState: initialStateInvestment,
    reducers: {
        updateInvestmentData: (state, action: PayloadAction<InvestmentAction>) => {
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


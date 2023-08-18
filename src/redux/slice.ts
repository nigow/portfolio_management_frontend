import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import expenditureData from '../json/expenditure.json';
import incomeData from '../json/income.json';
import investmentData from '../json/investment.json';
import axios from "axios";

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

export const updateCashData = createAsyncThunk(
    'cashData/updateCashData',
    async (data: CashAction) => {
        const { name, balance } = data;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('change', balance.toString());

        const response = await axios.post('http://localhost:8080/api/v1/cash/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    }
);


export const cashSlice = createSlice({
    name: 'cashData',
    initialState: cashInitialState,
    reducers: {
        loadCashData: (state, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateCashData.fulfilled, (state, action) => {
            const { name, balance, id } = action.payload;
            const foundItemIndex = state.findIndex((item) => item.name === name);

            if (foundItemIndex !== -1) {
                // @ts-ignore
                state[foundItemIndex].amount += balance;
            } else {
                // @ts-ignore
                state.push({ id, name, amount: balance });
            }
        });
    },
});

export const {  loadCashData } = cashSlice.actions;

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


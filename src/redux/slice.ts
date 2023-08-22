import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import expenditureData from '../json/expenditure.json';
import incomeData from '../json/income.json';
import axios from "axios";
import {accountActions, cashActions} from "../constants";

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
    action: typeof accountActions[keyof typeof accountActions];
    balance?: number;
    cashAction?: typeof cashActions[keyof typeof cashActions];
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
        let { name, balance, action, cashAction } = data;
        let endpoint = `${process.env.REACT_APP_ENDPOINT}`;
        switch (action) {
            case accountActions.ADD:
                endpoint += "/cash/create";
                break;
            case accountActions.MODIFY:
                endpoint += "/cash/total";
                if (balance && cashAction === cashActions.WITHDRAW) balance = -balance;
                break;
            case accountActions.DELETE:
                endpoint += "/cash/delete";
                break;
            default:
                break;
        }

        const formData = new FormData();
        formData.append('name', name);
        if (balance) formData.append('change', balance.toString());
        const response = action === accountActions.DELETE ?
            await axios.delete(endpoint, {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }) :
            await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        if (action === accountActions.MODIFY) {
            return {name: name, balance: balance, accountAction: action}
        }

        return {...response.data, accountAction: action};
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
            const { name, balance, id, accountAction } = action.payload;
            const foundItemIndex = state.findIndex((item) => item.name === name);
            switch (accountAction) {
                case accountActions.ADD:
                    if (foundItemIndex === -1) {
                        // @ts-ignore
                        state.push({ id, name, amount: balance });
                    }
                    break;
                case accountActions.MODIFY:
                    if (foundItemIndex !== -1) {
                        // @ts-ignore
                        state[foundItemIndex].amount += balance;
                    }
                    break;
                case accountActions.DELETE:
                    if (foundItemIndex !== -1) state.splice(foundItemIndex, 1)
                    break;
                default:
                    break;
            }

        });
    },
});

export const selectCashData = (state: { cashData: any; }) => state.cashData;

export const { loadCashData } = cashSlice.actions;

interface InvestmentItem {
    ticker: string;
    amountOwned: number;
    costBasis: number;
}

interface InvestmentAction extends InvestmentItem{
    buyOrSell: string;
}

export const fetchInitialInvestmentData = createAsyncThunk<InvestmentItem[], void>(
    'cashData/fetchInitialCashData',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/inventory/stock-owned/get/admin`);
            const data: InvestmentItem[] = await response.json();

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateInvestmentData = createAsyncThunk(
    'cashData/updateInvestmentData',
    async (data: InvestmentAction) => {
        const { ticker, amountOwned, buyOrSell } = data;
        const actionField = buyOrSell === "Buy" ? "sharesToBuy" : "sharesToSell"
        const formData = {
            "ticker": ticker,
            "username": "admin"
        }
        // @ts-ignore
        formData[actionField] = amountOwned;
        const endpoint = `${process.env.REACT_APP_ENDPOINT}/inventory/${buyOrSell.toLowerCase()}`
        await axios.post(endpoint, formData);
        return {...data};
    }
);

export const investmentSlice = createSlice({
    name: 'investmentData',
    initialState: [],
    reducers: {
        loadInvestmentData: (state, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateInvestmentData.fulfilled, (state, action) => {
            const { ticker, amountOwned, costBasis, buyOrSell } = action.payload;
            const foundItemIndex = state.findIndex((item: InvestmentItem) => item.ticker === ticker);
            const realAmountModified = buyOrSell == "Buy" ? amountOwned : -amountOwned;
            if (foundItemIndex !== -1) {
                // @ts-ignore
                // @ts-ignore
                state[foundItemIndex].amountOwned += realAmountModified;
            }
            else {
                // @ts-ignore
                state.push({ ticker, amountOwned, costBasis });
            }
        });
    },
});

export const { loadInvestmentData } = investmentSlice.actions;

export const selectInvestmentData = (state: { investmentData: InvestmentItem[]; }) => state.investmentData;

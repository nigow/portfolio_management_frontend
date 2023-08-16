import {configureStore, createAsyncThunk} from '@reduxjs/toolkit';
import {
    accountDataSlice,
    expenditureDataSlice,
    incomeDataSlice,
    loadExpenditureData,
    loadIncomeData,
    manipulateAccountTypeSlice,
    manipulateActionSlice
} from "./slice";
import expenditureData from './expenditure.json';
import incomeData from './income.json';

const loadInitialExpenditureData = createAsyncThunk(
    'expenditureData/loadInitialData',
    async (_, { dispatch }) => {
        dispatch(loadExpenditureData(expenditureData));
    }
);

const loadInitialIncomeData = createAsyncThunk(
    'expenditureData/loadInitialData',
    async (_, { dispatch }) => {
        dispatch(loadIncomeData(incomeData));
    }
);

const store = configureStore({
    reducer: {
        expenditureData: expenditureDataSlice.reducer,
        incomeData: incomeDataSlice.reducer,
        manipulateActionSlice: manipulateActionSlice.reducer,
        manipulateAccountTypeSlice: manipulateAccountTypeSlice.reducer,
        accountData: accountDataSlice.reducer
    },
});

store.dispatch(loadInitialExpenditureData);
store.dispatch(loadInitialIncomeData);

export default store;

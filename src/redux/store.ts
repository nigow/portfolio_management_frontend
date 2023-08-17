import {configureStore, createAsyncThunk} from '@reduxjs/toolkit';
import {
    cashSlice,
    expenditureDataSlice,
    incomeDataSlice,
    investmentSlice,
    loadExpenditureData,
    loadIncomeData,
    manipulateAccountTypeSlice,
    manipulateActionSlice
} from "./slice";
import expenditureData from '../json/expenditure.json';
import incomeData from '../json/income.json';

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
        cashData: cashSlice.reducer,
        investmentData: investmentSlice.reducer
    },
});

store.dispatch(loadInitialExpenditureData);
store.dispatch(loadInitialIncomeData);

export default store;
import { createAction } from "@reduxjs/toolkit";

export const loadAction = createAction<string>("loadActionData");
export const loadAccountType = createAction<string>("loadAccountTypeData");

export interface AccountChange {
    accountType: "CASH" | "EQUITY" | "BOND";
    name: string;
    amount: number;
}
export const loadAccountChange = createAction<AccountChange>("loadAccountChange");

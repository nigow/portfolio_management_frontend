import { createAction } from "@reduxjs/toolkit";

export const loadAction = createAction<string>("loadActionData");
export const loadAccountType = createAction<string>("loadAccountTypeData");

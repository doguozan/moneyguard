import { createSlice } from "@reduxjs/toolkit";
import { getCurrency } from "./operations";

const initialState = {
  data: null,
  isCurrencyLoading: false,
  isCurrencyError: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrency.pending, (state) => {
        state.isCurrencyLoading = true;
        state.isCurrencyError = null;
      })
      .addCase(getCurrency.fulfilled, (state, { payload }) => {
        state.isCurrencyLoading = false;
        state.data = payload;
      })
      .addCase(getCurrency.rejected, (state, { payload }) => {
        state.isCurrencyLoading = false;
        state.isCurrencyError = payload;
      });
  },
});

export const currencyReducer = currencySlice.reducer;

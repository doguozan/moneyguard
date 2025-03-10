import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrencyData } from "./currencyApi";
import {
  setDataToLocalStorage,
  getCurrencyDataFromLocalStorage,
} from "../../helpers/currencyApiHelpers";

export const getCurrency = createAsyncThunk(
  "currency/getCurrency",
  async (_, thunkAPI) => {
    try {
      const cachedData = getCurrencyDataFromLocalStorage();
      if (cachedData) return cachedData;

      const data = await fetchCurrencyData();
      setDataToLocalStorage(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrencyRates = createAsyncThunk(
  "currency/fetchCurrencyRates",
  async (_, thunkAPI) => {
    try {
      const data = await getCurrencyRates();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

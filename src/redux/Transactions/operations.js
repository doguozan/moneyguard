import { createAsyncThunk } from "@reduxjs/toolkit";
import { userTransactionsApi, setToken } from "../../config/userTransactionApi";
import { getBalanceThunk } from "../Auth/operations";

// Tüm işlemleri getirmek için thunk
export const getTransactions = createAsyncThunk(
  "transactions/all",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;
      if (!token) {
        throw new Error("No token found");
      }
      setToken(token);
      const { data } = await userTransactionsApi.get("/api/transactions");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// İşlem eklemek için thunk
export const addTransactions = createAsyncThunk(
  "transactions/add",
  async (transaction, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;
      if (!token) {
        throw new Error("No token found");
      }
      setToken(token);
      const { data } = await userTransactionsApi.post(
        "/api/transactions",
        transaction
      );
      await thunkApi.dispatch(getBalanceThunk());
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// İşlem silmek için thunk
export const deleteTransactions = createAsyncThunk(
  "transactions/delete",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;
      if (!token) {
        throw new Error("No token found");
      }
      setToken(token);
      await userTransactionsApi.delete(`/api/transactions/${id}`);
      await thunkApi.dispatch(getBalanceThunk());
      await thunkApi.dispatch(getTransactions());
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// İşlem güncellemek için thunk
export const editTransactions = createAsyncThunk(
  "transactions/edit",
  async ({ id, transaction }, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;
      if (!token) {
        throw new Error("No token found");
      }
      setToken(token);

      const response = await userTransactionsApi.patch(
        `/api/transactions/${id}`,
        transaction
      );

      if (!response.data) {
        throw new Error("No data received from API");
      }

      await thunkApi.dispatch(getBalanceThunk());
      await thunkApi.dispatch(getTransactions());

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  }
);

// Kategoriye göre işlem getirmek için
export const fetchTransactionsByCategory = createAsyncThunk(
  "transactions/fetchByCategory",
  async (category, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;
      if (!token) {
        throw new Error("No token found");
      }
      setToken(token);
      const { data } = await userTransactionsApi.get(
        `/api/transactions?category=${category}`
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  userTransactionsApi,
  setToken,
  removeToken,
} from "../../config/userTransactionApi";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    // -Kullanıcı kaydı için gerekli fonksiyon...
    try {
      const { data } = await userTransactionsApi.post(
        "/api/auth/sign-up",
        credentials
      );
      setToken(data.token);
      return {
        user: {
          username: credentials.username,
          email: credentials.email,
          balance: data.user.balance,
        },
        token: data.token,
      };
    } catch (error) {
      // API'den gelen spesifik hata mesajını kontrol et
      if (error.response?.status === 409) {
        return thunkAPI.rejectWithValue("This email is already registered");
      }
      // Diğer hata durumları için
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    // -Kullanıcı girişi için gerekli fonksiyon...
    try {
      const { data } = await userTransactionsApi.post(
        "/api/auth/sign-in",
        credentials
      );
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      // Çıkış API isteği gönderiliyor
      const { data } = await userTransactionsApi.delete("/api/auth/sign-out");

      // LocalStorage'dan token siliniyor
      removeToken();

      // Başarılıysa veriyi döndür
      return data;
    } catch (error) {
      console.error("logoutThunk hata:", error);

      // Hata mesajını yakala ve redux'a gönder
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (savedToken) {
      setToken(savedToken);
    } else {
      return thunkAPI.rejectWithValue("Token doesn't exist");
    }

    try {
      const { data } = await userTransactionsApi.get("/api/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBalanceThunk = createAsyncThunk(
  "getBalannce",
  async (_, thunkAPI) => {
    // - Kullanıcıların balance'ını almak için gerekli fonksiyon...
    try {
      const { data } = await userTransactionsApi.get("/api/users/current");
      return data.balance;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  loginThunk,
  logoutThunk,
  refreshThunk,
  getBalanceThunk,
} from "./operations";

const authInitialState = {
  user: {
    name: null,
    email: null,
    balance: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isAuthLoading: false,
  isAuthError: null,
  // ^^ ^^ ^^
  //Burdaki ekstra initial state'ler dinamik verilerde işlenmesi gereken stateler şimdilik bu şekilde yaptım kim çalışıcaksa o şekilde düzenleyebilir.
  //Örn; logIn fonksiyonu fullfilled olduğunda state.isLoggedIn = true; gibi...
};

const slice = createSlice({
  name: "auth",
  initialState: authInitialState,
  extraReducers: (builder) => {
    builder
      // registerThunk için extraReducers
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user.name = payload.user.username;
        state.user.email = payload.user.email;
        state.user.balance = payload.user.balance;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isAuthLoading = false;
        state.isAuthError = null;
      })
      .addCase(registerThunk.pending, (state) => {
        state.isAuthLoading = true;
        state.isAuthError = null;
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.isAuthLoading = false;
        state.isAuthError = payload;
      })

      // loginThunk için extraReducers
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user.name = payload.user.username;
        state.user.email = payload.user.email;
        state.user.balance = payload.user.balance;
        state.token = payload.token;
        state.isLoggedIn = true;
        state.isAuthLoading = false;
        state.isAuthError = null;
      })
      .addCase(loginThunk.pending, (state) => {
        state.isAuthLoading = true;
        state.isAuthError = null;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.isAuthLoading = false;
        state.isAuthError = payload;
      })

      // logoutThunk için ekstraReducers
      .addCase(logoutThunk.fulfilled, () => {
        return authInitialState;
      })
      //.addCase(logoutThunk.pending, () => {})
      //.addCase(logoutThunk.rejected, () => {})

      // refreshThunk için ekstraReducers
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.user.name = payload.username;
        state.user.email = payload.email;
        state.user.balance = payload.balance;

        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isAuthLoading = false;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isRefreshing = true;
        state.isAuthLoading = true;
        state.isLoggedIn = true;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefreshing = false;
        state.isAuthLoading = false;
        state.isLoggedIn = false;
      })

      // getBalanceThunk için ekstraReducers
      .addCase(getBalanceThunk.fulfilled, (state, { payload }) => {
        state.user.balance = payload;
      });
    //.addCase(getBalanceThunk.pending, (state) => { state.isAuthLoading = true; })
    //.addCase(getBalanceThunk.rejected, (state) => { state.isAuthLoading = false; });

    // Proje tamamlandığında birbirini tekrar eden extraReducerlar için bir fonksiyon yazılabilir
  },
});

export const authReducer = slice.reducer;

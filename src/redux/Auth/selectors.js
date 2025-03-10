// Auth içerisinden User'ı almak için selector
export const selectUser = (state) => state.auth.user;

// Auth içerisinden tokeni almak için selector
export const selectToken = (state) => state.auth.token;

// Auth içerisinden isLoggedIn bilgisini almak için selector
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// Auth içerisinden isRefreshing bilgisini almak için selector
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

// Auth içerisinden isAuthLoading bilgisini almak için selector
export const selectIsAuthLoading = (state) => state.auth.isAuthLoading;

// Auth içerisinden isAuthError bilgisini almak için selector
export const selectIsAuthError = (state) => state.auth.isAuthError;

// Auth içerisinden User'ın balance verisini almak için selector
export const selectUserBalance = (state) => state.auth.user.balance;

// Yapılan projeden değerlendirerek gerekli olabilicek bilgileri seçtim ama ekstra bir şey eklemek istersek bu selector'ler gibi yapabiliriz

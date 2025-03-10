// transactionsSlice içinden transaction'ları almak için selector
export const selectTransactions = (state) => state.transactions.transactions;

// transactionsSlice içinden isLoading bilgisini almak için selector
export const selectTransLoading = (state) => state.transactions.isTransLoading;

// transactionsSlice içinden error bilgisini almak için selector
export const selectTransError = (state) => state.transactions.isTransError;

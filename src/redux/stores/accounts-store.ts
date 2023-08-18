import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../reducers/accounts-reducer"

const accountsStore = configureStore({
  reducer: {
    accounts: accountsReducer.reducer,
  },
});

export type AccountsDispatch = typeof accountsStore.dispatch;
export type RootState = ReturnType<typeof accountsStore.getState>;

export default accountsStore;

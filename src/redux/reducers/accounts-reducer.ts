import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccounts } from "../../services/api-service";

export const getAccounts = createAsyncThunk("accounts/get", async () => {
  try {
    const res = await fetchAccounts();
    return res;
  } catch (err) {
    console.error(err);
  }
});

const accountsReducer = createSlice({
  name: "accounts",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAccounts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default accountsReducer;

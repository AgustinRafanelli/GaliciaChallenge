import { configureStore } from "@reduxjs/toolkit";
import { expect, describe, test, beforeEach, jest } from "@jest/globals";
import accountsReducer, {
  getAccounts,
} from "../../src/redux/reducers/accounts-reducer";
import { fetchAccounts } from "../../src/services/api-service";

describe("Accounts Redux Slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        accounts: accountsReducer.reducer,
      },
    });
  });

  test("should set accounts in the store", () => {
    const fakeAccounts = [
      { id: 1, balance: 100, currency: "USD", type: "Savings" },
      { id: 2, balance: 200, currency: "EUR", type: "Checking" },
    ];

    (
      fetchAccounts as jest.MockedFunction<typeof fetchAccounts>
    ).mockResolvedValue([
      { id: 872378326701, balance: "1500", currency: "u$s", type: "CC" },
      { id: 872378327823, balance: "250", currency: "$", type: "CA" },
    ]);
    store.dispatch(getAccounts());

    const state = store.getState().accounts;
    expect(state).toEqual(fakeAccounts);
  });
});

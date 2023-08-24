import { configureStore } from "@reduxjs/toolkit";
import { expect, describe, test, beforeEach, jest } from "@jest/globals";
import accountsReducer, {
  getAccounts,
} from "../../src/redux/reducers/accounts-reducer";
import * as apiService from "../../src/services/api-service";

describe("Accounts Redux Slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        accounts: accountsReducer.reducer,
      },
    });
  });

  test("Guarda las cuentas correctamente", async () => {
    const fakeAccounts = [
      { id: 872378326701, balance: "1500", currency: "u$s", type: "CC" },
      { id: 872378327823, balance: "250", currency: "$", type: "CA" },
    ]

    const fetchSpy = jest.spyOn(apiService, 'fetchAccounts');

    fetchSpy.mockResolvedValue([
      { id: 872378326701, balance: "1500", currency: "u$s", type: "CC" },
      { id: 872378327823, balance: "250", currency: "$", type: "CA" },
    ]);

    await store.dispatch(getAccounts());

    const state = store.getState().accounts;
    expect(state).toEqual(fakeAccounts);
  });
});

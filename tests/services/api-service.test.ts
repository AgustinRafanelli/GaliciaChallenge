import { expect, describe, test } from "@jest/globals";
import {
  Account,
  accountsFilter,
  accountsTranslator,
  fetchAccountResponse,
} from "../../src/services/api-service";


describe("accountsTranslator", () => {
  test("traduce correctamente los datos de un tipo a otro", () => {
    const fetchAccountsResponse = [
      {
        e: "1",
        n: "872378326701",
        t: "02",
        saldo: "1500",
        moneda: "u$s",
        tipo_letras: "CC",
      },
      {
        e: "1",
        n: "872378327823",
        t: "11",
        saldo: "250",
        moneda: "$",
        tipo_letras: "CA",
      },
    ];

    const expectedTranslatedAccounts = [
      { id: 1, balance: "100", currency: "u$s", type: "CC" },
      { id: 872378327823, balance: "250", currency: "$", type: "CA" },
    ];

    const translatedAccounts = accountsTranslator(fetchAccountsResponse);

    expect(translatedAccounts).toEqual(expectedTranslatedAccounts);
  });
});

import { expect, describe, test } from "@jest/globals";
import {
  accountsFilter,
  accountsTranslator,
  fetchAccounts,
} from "../../src/services/api-service";
import axios from "axios";

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
      { id: 872378326701, balance: "1500", currency: "u$s", type: "CC" },
      { id: 872378327823, balance: "250", currency: "$", type: "CA" },
    ];

    const translatedAccounts = accountsTranslator(fetchAccountsResponse);

    expect(translatedAccounts).toEqual(expectedTranslatedAccounts);
  });
});

describe("accountsFilter", () => {
  test("Solo trae los datos de las cuentas requeridas segun la documentacion", () => {
    const unfilteredAccounts = [
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
      {
        e: "1",
        n: " ",
        t: "11",
        saldo: "250",
        moneda: "$",
        tipo_letras: "CA",
      },
      {
        e: "1",
        n: "87238678701",
        t: "02",
        saldo: "1500",
        moneda: "u$s",
        tipo_letras: "Cc",
      },
      {
        e: "1",
        n: "8723709873243",
        t: "11",
        saldo: "250",
        moneda: "uy$",
        tipo_letras: "CA",
      },
      {
        e: "1",
        n: "872373427823",
        t: "11",
        saldo: "250-500",
        moneda: "$",
        tipo_letras: "CA",
      },
      {
        e: "1",
        n: "87237687823",
        t: "11",
        saldo: "-250",
        moneda: "$",
        tipo_letras: "CA",
      },
    ];

    const expectedFilteredAccounts = [
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
      {
        e: "1",
        n: "87237687823",
        t: "11",
        saldo: "-250",
        moneda: "$",
        tipo_letras: "CA",
      },
    ];

    const translatedAccounts = accountsFilter(unfilteredAccounts);

    expect(translatedAccounts).toEqual(expectedFilteredAccounts);
  });
  test("Devuelve un array vacio al no haber cuentas validas", () => {
    const unfilteredAccounts = [
      {
        e: "1",
        n: " ",
        t: "11",
        saldo: "250",
        moneda: "$",
        tipo_letras: "CA",
      },
      {
        e: "1",
        n: "87238678701",
        t: "02",
        saldo: "1500",
        moneda: "u$s",
        tipo_letras: "Cc",
      },
      {
        e: "1",
        n: "8723709873243",
        t: "11",
        saldo: "250",
        moneda: "uy$",
        tipo_letras: "CA",
      },
      {
        e: "1",
        n: "872373427823",
        t: "11",
        saldo: "250-500",
        moneda: "$",
        tipo_letras: "CA",
      },
    ];

    const expectedFilteredAccounts = [];

    const translatedAccounts = accountsFilter(unfilteredAccounts);

    expect(translatedAccounts).toEqual(expectedFilteredAccounts);
  });
});
import { expect, describe, test, jest, afterEach } from "@jest/globals";
import MockAdapter from "axios-mock-adapter";
import {
  accountsFilter,
  accountsTranslator,
  fetchAccounts,
} from "../../src/services/api-service";
import axios from "axios";

jest.mock("axios");

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

describe("fetchAccounts", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  test("Trae los datos del endpoint exitosamente", async () => {
    const responseData = {
      cuentas: [
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
          n: "872378326702",
          t: "01",
          saldo: "-600",
          moneda: "$",
          tipo_letras: "Cc",
        },
        {
          e: "1",
          n: "872378326703",
          t: "01",
          saldo: "745",
          moneda: "$",
          tipo_letras: "CC",
        },
        {
          e: "1",
          n: "872378326706",
          t: "01",
          saldo: "2-5-0",
          moneda: "$",
          tipo_letras: "CA",
        },
        {
          e: "1",
          n: "872378326707",
          t: "01",
          saldo: "25000",
          moneda: "$uy",
          tipo_letras: "CC",
        },
        {
          e: "1",
          n: "872378326708",
          t: "01",
          saldo: "659",
          moneda: "u$s",
          tipo_letras: "CCP",
        },
        {
          e: "1",
          n: "872378326709",
          t: "01",
          saldo: "458",
          moneda: "$",
          tipo_letras: "CC",
        },
        {
          e: "1",
          n: "872378326710",
          t: "01",
          saldo: "700",
          moneda: "bs",
          tipo_letras: "CC",
        },
        {
          e: "1",
          n: " ",
          t: "01",
          saldo: "6458925",
          moneda: "$",
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
          n: "872378327823",
          t: "12",
          saldo: "45",
          moneda: "u$s",
          tipo_letras: "CA",
        },
      ],
      cuestas: [
        { id: 1, nombre: "Drama" },
        { id: 2, nombre: "Comedia" },
        { id: 3, nombre: "Documental" },
        { id: 4, nombre: "Acción" },
      ],
    };
    mockedAxios.mockResolvedValue({ data: responseData });

    const result = await fetchAccounts();

    expect(result).toEqual(accountsTranslator(responseData.cuentas));
  });

  test("menejo de error", async () => {
    mockedAxios.mockRejectedValue({ data: {} });

    const consoleErrorSpy = jest.spyOn(console, "error");
    consoleErrorSpy.mockImplementation(() => {});
    await fetchAccounts();

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});

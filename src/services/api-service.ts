import axios from "axios";

export interface fetchAccountResponse {
  e: string;
  n: string;
  t: string;
  saldo: string;
  moneda: string;
  tipo_letras: string;
}

export type currencyType = "$" | "u$s";
export type accountType = "CC" | "CA";
export type Account = {
  id: number;
  balance: string;
  currency: currencyType;
  type: accountType;
};

export function accountsFilter(
  accounts: Array<fetchAccountResponse>
): Array<fetchAccountResponse> {
  return accounts.filter((account: fetchAccountResponse) => {
    // valida que la moneda de la cuenta sea pesos o dolares
    const validCurrency: Set<string> = new Set(["$", "u$s"]);
    // valida que el tipo de cuenta sea Caja de Ahorros o Cuenta Corriente
    const validAccountType: Set<string> = new Set(["CC", "CA"]);
    // valida el numero de la cuenta sea un numero y sea mayor a 0
    const validNumber = (number: string) => {
      const regex = /^[1-9][0-9]*$/;
      return regex.test(number);
    };
    // valida que el saldo de la cuenta sea un numero real y
    // si es negativo que sea una Cuenta Corriente
    const validBalance = (tipo_letras: string, balance: string) => {
      const regex = tipo_letras === "CC" ? /^-?(?:0|[1-9]\d*)$/ : /^[1-9][0-9]*$/;
      return regex.test(balance);
    };
    return (
      validNumber(account.n) &&
      validAccountType.has(account.tipo_letras) &&
      validCurrency.has(account.moneda) &&
      validBalance(account.tipo_letras, account.saldo)
    );
  });
}

export function accountsTranslator(
  accounts: Array<fetchAccountResponse>
): Array<Account> {
  const filteredAccounts = accountsFilter(accounts);
  // traduce la respuesta del enpoint al tipo de objeto que se va a utilizar en la aplicacion
  const translatedAccounts = filteredAccounts.map(
    (account: fetchAccountResponse) => {
      const translatedAccount: Account = {
        id: parseInt(account.n),
        balance: account.saldo,
        currency: account.moneda as currencyType,
        type: account.tipo_letras as accountType,
      };
      return translatedAccount;
    }
  );
  return translatedAccounts;
}

export function fetchAccounts() {
  const url: string = process.env.REACT_APP_API_ROUTE || "";
  return axios({
    method: "get",
    url: url,
  })
    .then(({ data }) => {
      return accountsTranslator(data.cuentas);
    })
    .catch((err) => console.error(err));
}

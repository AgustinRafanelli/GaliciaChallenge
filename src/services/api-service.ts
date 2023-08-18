import axios from "axios";

interface AccountType {
  tipo_letras: string;
  moneda: string;
  n: string;
  saldo: string;
}

function accountsFilter(cuentas: any) {
  return cuentas.filter((account: AccountType) => {
    // valida que la moneda de la cuenta sea pesos o dolares
    const validCurrency: Set<string> = new Set(["$", "u$s"]);
    // valida que el tipo de cuenta sea Caja de Ahorros o Cuenta Corriente
    const validAccountType: Set<string> = new Set(["CC", "CA"]);
    // valida el numero de la cuenta sea un numero y sea mayor a 0
    const validNumber = (number: string) => {
      const regex = /^[1-9][0-9]*$/;
      return regex.test(number);
    };
    // valida que el saldo de la cuenta sea un numero real
    const validBalance = (balance: string) => {
      const regex = /^-?(?:0|[1-9]\d*)$/;
      return regex.test(balance)
    };
    return (
      validCurrency.has(account.moneda) &&
      validAccountType.has(account.tipo_letras) &&
      validNumber(account.n) &&
      validBalance(account.saldo)
    );
  });
}

export function fetchAccounts() {
  const url: string = process.env.REACT_APP_API_ROUTE || "";
  return axios({
    method: "get",
    url: url,
  })
    .then(({ data }) => {
      return accountsFilter(data.cuentas);
    })
    .catch((err) => console.error(err));
}

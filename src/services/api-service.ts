import axios from "axios";

interface AccountType {
  tipo_letras: string;
  moneda: string;
}

export function getAccounts(): Promise<[]> {
  const url: string = process.env.REACT_APP_API_ROUTE || "";
  return axios({
    method: "get",
    url: url,
  })
    .then(({ data }) => {
      return data.cuentas.filter((account: AccountType) => {
        const validCurrency: Set<string> = new Set(["$", "u$s"]);
        const validAccountType: Set<string> = new Set(["CC", "CA"]);
        return (
          validCurrency.has(account.moneda) &&
          validAccountType.has(account.tipo_letras)
        );
      });
    })
    .catch((err) => console.error(err));
}

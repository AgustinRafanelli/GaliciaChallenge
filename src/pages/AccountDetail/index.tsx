import React, { useEffect, useState } from "react";
import { Lable, Details } from "./mixins";
import { Page, Title, Subtitle } from "../commons/mixins";
import { Account } from "../../services/api-service";
import { accountCurrenyTraductor, accountTypeTraductor } from "../../utils/accounts";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/accounts-store";

const AccountsDetail = () => {
  const accounts = useSelector((state: RootState) => state.accounts);

  const [i, currency, id] = window.location.pathname.split("/");
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    // se revisa el array de cuentas que llega del endpoint para encontrar
    // a la que se quiere acceder
    if (!!accounts) {
      accounts.map((account) => {
        if (account.currency === currency && account.id === parseInt(id)) {
          setAccount(account);
        }
      });
    }
  }, [accounts]);

  if (!accounts) return null;

  return (
    <Page>
      <Subtitle>Consulta de Saldo</Subtitle>
      <Title>Este es tu saldo actual</Title>
      {/* en caso de que no se encuentre la cuenta
       se muesta un mensaje de error */}
      {!!account ? (
        <Details>
          <Lable>Saldo de la cuenta: {account?.balance}</Lable>
          <Lable>
            Tipo de Cuenta: {accountTypeTraductor[account?.type]} en{" "}
            {accountCurrenyTraductor[account?.currency]}
          </Lable>
          <Lable>Numero de cuenta: {account?.id}</Lable>
        </Details>
      ) : (
        <Lable>La cuenta con numero {id} no esta disponible</Lable>
      )}
    </Page>
  );
};

export default AccountsDetail;

import React, { useEffect, useState } from "react";
import { Lable, Details } from "./mixins";
import { Page, Title, Subtitle } from "../commons/mixins";
import { AccountInterface } from "../../services/api-service";
import { accountCurrenyTraductor, accountTypeTraductor } from "../../utils/accounts";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/accounts-store";

const AccountsDetail = () => {
  const accounts = useSelector((state: RootState) => state.accounts);

  const [i, currency, id] = window.location.pathname.split("/");
  const [account, setAccount] = useState<AccountInterface>();

  useEffect(() => {
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
      {!!account && (
        <Details>
          <Lable>Saldo de la cuenta: {account?.balance}</Lable>
          <Lable>
            Tipo de Cuenta: {accountTypeTraductor[account?.type]} en{" "}
            {accountCurrenyTraductor[account?.currency]}
          </Lable>
          <Lable>Numero de cuenta: {account?.id}</Lable>
        </Details>
      )}
    </Page>
  );
};

export default AccountsDetail;

import React, { useEffect } from "react";
import { Grid } from "./mixins";
import { Page, Title, Subtitle } from "../commons/mixins";
import Card from "../../components/card";
import { AccountInterface } from "../../services/api-service";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/accounts-store";

const AccountsList = () => {
  const accounts = useSelector((state: RootState) => state.accounts);
  const accountsTypeTraductor = {
    CC: "Cuenta Corriente",
    CA: "Caja de Ahorro",
  };

  useEffect(() => {
  }, [accounts]);

  return (
    <Page>
      <Subtitle>Consulta de Saldo</Subtitle>
      <Title>Selecciona la Cuenta a Consultar</Title>
      <Grid>
        {!!accounts &&
          accounts.map((account: AccountInterface, i) => {
            return <Card key={i} type="account" account={account} />;
          })}
      </Grid>
    </Page>
  );
};

export default AccountsList;

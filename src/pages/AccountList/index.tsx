import React from "react";
import { Page, Title, Subtitle } from "../commons/mixins";
import { useSelector } from "react-redux";

const AccountsList = () => {

  return (
    <Page>
      <Subtitle>Consulta de Saldo</Subtitle>
      <Title>Selecciona la Cuenta a Consultar</Title>
    </Page>
  );
};

export default AccountsList;

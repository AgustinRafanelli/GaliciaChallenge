import React, { useEffect } from "react";
import { Lable } from "./mixins";
import { Page, Title, Subtitle } from "../commons/mixins";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/accounts-store";

const AccountsList = () => {
  const accounts = useSelector((state: RootState) => state.accounts);

  useEffect(() => {
    console.log('use efect',accounts);
  }, [accounts]);
  
  return (
    <Page>
      <Subtitle>Consulta de Saldo</Subtitle>
      <Title>Selecciona la Cuenta a Consultar</Title>
      
    </Page>
  );
};

export default AccountsList;

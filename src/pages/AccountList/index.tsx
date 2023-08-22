import React, { useEffect, useState } from "react";
import { Grid } from "./mixins";
import { Page, Title, Subtitle } from "../commons/mixins";
import Card from "../../components/card";
import { Account } from "../../services/api-service";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/accounts-store";

export type CardButton = {
  lable: string;
  action: () => void;
};

const AccountsList = () => {
  const accounts = useSelector((state: RootState) => state.accounts);
  const [pagination, setPagination] = useState<Array<any>>();
  const [activePage, setActivePage] = useState<number>(0);

  function paginator(
    accounts: Array<Account>,
    activePage: number,
    setActivePage: React.Dispatch<React.SetStateAction<number>>,
    paginatedAccounts: Array<any> = []
  ): Array<Array<Account | CardButton>> {
    const pageNumber = paginatedAccounts.length;
    if (pageNumber == 0) {
      if (accounts.length <= 6) {
        paginatedAccounts.push(accounts);
        return paginatedAccounts;
      } else {
        const page: Array<Account | CardButton> = accounts.slice(0, 5);
        const rest = accounts.slice(5, accounts.length - 1);
        page.push({
          lable: "Mas opciones >>",
          action: () => {
            setActivePage(1);
          },
        });
        paginatedAccounts.push(page);
        return paginator(rest, activePage, setActivePage, paginatedAccounts);
      }
    } else {
      if (accounts.length <= 5) {
        const page: Array<Account | CardButton> = accounts;
        page.unshift({
          lable: "<< Opciones anteriores",
          action: () => setActivePage(pageNumber - 1),
        });
        paginatedAccounts.push(page);
        return paginatedAccounts;
      } else {
        const page: Array<Account | CardButton> = accounts.slice(0, 4);
        const rest = accounts.slice(4, accounts.length - 1);
        page.unshift({
          lable: "<< Opciones anteriores",
          action: () => setActivePage(pageNumber - 1),
        });
        page.push({
          lable: "Mas opciones >>",
          action: () => {
            setActivePage(pageNumber + 1);
          },
        });
        paginatedAccounts.push(page);
        return paginator(rest, activePage, setActivePage, paginatedAccounts);
      }
    }
  }

  useEffect(() => {
    setActivePage(0);
    setPagination(paginator(accounts, activePage, setActivePage));
  }, [accounts]);

  return (
    <Page>
      <Subtitle>Consulta de Saldo</Subtitle>
      <Title>Selecciona la Cuenta a Consultar</Title>
      <Grid>
        {!!pagination &&
          pagination[activePage].map(
            (card: Account | CardButton, i: number) => {
              if ("id" in card) {
                return <Card key={i} account={card as Account} />;
              } else {
                return <Card key={i} button={card as CardButton} />;
              }
            }
          )}
      </Grid>
    </Page>
  );
};

export default AccountsList;

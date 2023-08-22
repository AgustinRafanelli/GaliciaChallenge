import React from "react";
import { CardWrapper, Lable } from "./mixins";
import { useNavigate } from "react-router-dom";
import { AccountInterface } from "../../services/api-service";
import { accountTypeTraductor } from "../../utils/accounts";

interface Card {
  type: string;
  account?: AccountInterface;
}

const Card = ({ type, account }: Card) => {
  const isAccount = type == "account";
  const navigate = useNavigate();

  if (!!account)
    return (
      <CardWrapper
        onClick={() => navigate(account?.currency + "/" + account?.id)}
      >
        <Lable>{accountTypeTraductor[account?.type]}</Lable>
        <Lable>Nro: {account?.id}</Lable>
      </CardWrapper>
    );
};

export default Card;

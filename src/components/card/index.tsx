import React from "react";
import { CardWrapper, Lable } from "./mixins";
import { useNavigate } from "react-router-dom";
import { Account } from "../../services/api-service";
import { accountTypeTraductor } from "../../utils/accounts";
import { CardButton } from "../../pages/AccountList";

interface Card {
  account?: Account;
  button?: CardButton;
}

const Card = ({ account, button }: Card) => {
  const navigate = useNavigate();

  // si se le pasa una cuenta a la card, lleva al usuario a la pagina de detalle de dicha cuenta
  // si se le pasa un boton de navegacion, pasa a la siguiente pagina
  const onClickHandler = () => {
    if (!!account) {
      navigate(account?.currency + "/" + account?.id);
    } else {
      button && button.action();
    }
  };

    return (
      <CardWrapper onClick={() => onClickHandler()}>
        {!!account ? (
          <>
            <Lable>{accountTypeTraductor[account?.type]}</Lable>
            <Lable>Nro: {account?.id}</Lable>
          </>
        ) : (
          <Lable>{button?.lable}</Lable>
        )}
      </CardWrapper>
    );
};

export default Card;

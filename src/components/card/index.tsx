import React from "react";
import {CardWrapper, Lable} from "./mixins"

interface Card {
  type: string;
  accountType?: string;
  accountNumber?: number;
}

const Card = ({ type, accountType, accountNumber }: Card) => {
  return (
    <CardWrapper>
      {type == "account" && (
        <>
          <Lable>{accountType}</Lable>
          <Lable>{accountNumber}</Lable>
        </>
      )}
    </CardWrapper>
  );
};

export default Card;

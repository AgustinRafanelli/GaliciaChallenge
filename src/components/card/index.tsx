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
          <span>{accountType}</span>
          <span>{accountNumber}</span>
        </>
      )}
    </CardWrapper>
  );
};

export default Card;

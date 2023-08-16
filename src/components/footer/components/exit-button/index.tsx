import React from "react";
import { ButtonWrapper, Lable } from "./mixins";
import { useNavigate } from "react-router-dom";

const ExitButton = () => {
  const navigate = useNavigate();
  return (
    <ButtonWrapper onClick={() => navigate("/")}>
      <Lable>Salir</Lable>
    </ButtonWrapper>
  );
};

export default ExitButton;

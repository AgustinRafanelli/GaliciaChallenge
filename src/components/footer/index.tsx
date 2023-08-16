import React from "react";
import { FooterWrapper, Lable } from "./mixins";
import ExitButton from "./components/exit-button";

const Footer = () => {
  return (
    <FooterWrapper id="footer">
      <ExitButton />
    </FooterWrapper>
  );
};

export default Footer;

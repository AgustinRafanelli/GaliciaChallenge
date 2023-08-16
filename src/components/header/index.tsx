import React from "react";
import { HeaderWrapper, Logo } from "./mixins";
import NCRLogo from "../../assets/ncr-logo.png";

interface HeaderType {
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const Header = ({children} : HeaderType) => {
  return (
    <HeaderWrapper id="header">
      <Logo src={NCRLogo} />
    </HeaderWrapper>
  );
};

export default Header;

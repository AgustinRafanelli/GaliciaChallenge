import React from "react";
import { HeaderWrapper, Logo } from "./mixins";
import NCRLogo from "../../assets/ncr-logo.png";

interface HeaderType {
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element)
}

const Header = ({children} : HeaderType) => {
  return (
    <HeaderWrapper>
      <Logo src={NCRLogo} />
      {process.env.REACT_APP_API_ROUTE}
    </HeaderWrapper>
  );
};

export default Header;

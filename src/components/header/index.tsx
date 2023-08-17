import React from "react";
import { HeaderWrapper, Logo } from "./mixins";
import NCRLogo from "../../assets/ncr-logo.png";

const Header = () => {
  return (
    <HeaderWrapper id="header">
      <Logo src={NCRLogo} />
    </HeaderWrapper>
  );
};

export default Header;

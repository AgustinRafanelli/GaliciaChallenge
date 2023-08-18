import React, { useEffect } from "react";
import { HeaderWrapper, Logo } from "./mixins";
import NCRLogo from "../../assets/ncr-logo.png";
// redux
import { useDispatch } from "react-redux";
import { getAccounts } from "../../redux/reducers/accounts-reducer";
import { AccountsDispatch } from "../../redux/stores/accounts-store";

const Header = () => {
  const dispatch = useDispatch<AccountsDispatch>();
  
  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  return (
    <HeaderWrapper id="header">
      <Logo src={NCRLogo} />
    </HeaderWrapper>
  );
};

export default Header;

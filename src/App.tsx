import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Header from "./components/header/index";
import Footer from "./components/footer";
import AccountsList from "./pages/AccountList";
import AccountsDetail from "./pages/AccountDetail";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AccountsList />} />
        <Route path="/:currency/:number" element={<AccountsDetail />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

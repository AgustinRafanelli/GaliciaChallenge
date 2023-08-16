import React from "react";
import Header from "./components/header/index";
import { Navigate, Route, Routes } from "react-router";
import Footer from "./components/footer";

const App = () => {
  return (
    <>
      <Header />
      {/* <Routes>
        <Route path="/" element={<AccountsList />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Routes> */}
      <Footer />
    </>
  );
};

export default App;

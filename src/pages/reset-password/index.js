import React, { useCallback } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Reset = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="main-bg-grad home-cover">
        <div className="home-overlay"></div>
        <div className="flex py30 flex-col flex-column justify-content-center align-items-center py20 px10">
          RESET PASSWORD
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Reset;

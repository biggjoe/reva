import React from "react";
import useAuthService from "../../../services/useAuthService";
import Layout from "../../../components/Account/Layout";
import AffiliateHome from "../../../components/Account/Affiliate/AffiliateHome";

const Affiliate = () => {
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <AffiliateHome />
        </section>
      </Layout>
    </React.Fragment>
  );
};

export default Affiliate;

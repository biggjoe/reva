import React from "react";
import Layout from "../../../components/Account/Layout";
import ReferralHome from "../../../components/Account/Referral/ReferralHome";

const Referral = () => {
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <ReferralHome />
        </section>
      </Layout>
    </React.Fragment>
  );
};

export default Referral;

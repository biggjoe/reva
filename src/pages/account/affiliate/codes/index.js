import React from "react";
import useAuthService from "../../../../services/useAuthService";
import Layout from "../../../../components/Account/Layout";
import AffiliateHome from "../../../../components/Account/Affiliate/AffiliateHome";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          {JSON.stringify(router.query)}
        </section>
      </Layout>
    </React.Fragment>
  );
};

export default Home;

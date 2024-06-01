import React from "react";
import useAuthService from "../../../../services/useAuthService";
import Layout from "../../../../components/Admin/Layout";
import AffiliateHome from "../../../../components/Admin/Affiliate/AffiliateHome";
import { useRouter } from "next/router";
import { Card } from "@mui/material";

const Home = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="container pxy20-resp">
            <Card sx={{ borderRadius: "0" }}>
              {JSON.stringify(router.query)}
            </Card>
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
};

export default Home;

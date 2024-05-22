import React from "react";
import BuyPanel from "../../components/BuyPanel";
import Layout from "../../components/Account/Layout";

const Purchase = () => {
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="flex flex-col flex-column justify-content-center align-items-center py20 px10">
            <BuyPanel />
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
};

export default Purchase;

import React from "react";
import { Breadcrumbs, Button, Card, Divider } from "@mui/material";
import Link from "next/link";
import LogPay from "../../../components/LogPay";
import Layout from "../../../components/Admin/Layout";
import TransactionList from "../../../components/Admin/Transactions/List";

const Transactions = () => {
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="container pxy20-resp">
            <Card sx={{ borderRadius: "0" }}>
              <TransactionList page="admin" />
            </Card>
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
};

export default Transactions;

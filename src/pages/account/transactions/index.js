import React from "react";
import Layout from "../../../components/Account/Layout";
import TransactionList from "../../../components/Transactions/TransactionList";
import { Breadcrumbs, Button, Card, Divider } from "@mui/material";
import Link from "next/link";
import LogPay from "../../../components/LogPay";

const Transactions = () => {
  const closeInvoice = () => setInvoice({ ...invoice_data, onopen: false });
  const [invoice_data, setInvoice] = React.useState({
    onopen: false,
    onclose: closeInvoice,
  });

  const launchInvoice = () => {
    setInvoice({ ...invoice_data, onopen: true, onclose: closeInvoice });
    console.log(invoice_data);
  };
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="container pxy20-resp">
            <Card sx={{ borderRadius: "0" }}>
              <TransactionList page="account" />
            </Card>
          </div>
        </section>
        <LogPay data={invoice_data} />
      </Layout>
    </React.Fragment>
  );
};

export default Transactions;

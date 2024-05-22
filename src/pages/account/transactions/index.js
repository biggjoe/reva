import React from "react";
import Layout from "../../../components/Account/Layout";
import TransactionList from "../../../components/Account/Transactions/TRansactionList";
import { Breadcrumbs, Button, Card, Divider } from "@mui/material";
import Link from "next/link";
import LogPay from "../../../components/Account/Transactions/LogPay";

const Transactions = () => {

  const closeInvoice = () => setInvoice({ ...invoice_data, onopen: false });
  const [invoice_data, setInvoice] = React.useState({
    onopen: false,
    onclose: closeInvoice,
  });

  const launchInvoice = () => {
    setInvoice({ ...invoice_data,  onopen: true, onclose: closeInvoice });
    console.log(invoice_data);
  };
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <Card sx={{ borderRadius: "0" }}>
            <div className="page-head bga">
              <div className="flex flex-row-resp align-items-center">
                <div className="inline-block pxy20 spacer">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Link href="/account/dashboard">Dashboard</Link>
                    <span>Transactions</span>
                  </Breadcrumbs>
                  <h2 className="mt20">Transactions</h2>
                </div>


<div className="px10">
  <Button onClick={launchInvoice} 
  variant="contained" color="primary">Log Payment</Button></div>

              </div>
            </div>
<Divider/>
            <TransactionList />
          </Card>
        </section>
        <LogPay data={invoice_data}/>
      </Layout>
    </React.Fragment>
  );
};

export default Transactions;


import React from "react";import { Grid } from "@mui/material";
import Link from "next/link";
const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Link className="grid-card bga" href="/admin/faq">
              <div className="pxy30">
                <div className="icon-pane">
                  <i className="fas fa-question-circle"></i>
                </div>
                <div className="pane-title mt20">FAQ</div>
              </div>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link className="grid-card bga" href="/admin/pages">
              <div className="pxy30">
                <div className="icon-pane">
                  <i className="fas fa-file"></i>
                </div>
                <div className="pane-title mt20">Pages</div>
              </div>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Link className="grid-card bga" href="/admin/whitepaper">
              <div className="pxy30">
                <div className="icon-pane">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div className="pane-title mt20">Whitepaper</div>
              </div>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link className="grid-card bga" href="/admin/site-settings">
              <div className="pxy30">
                <div className="icon-pane">
                  <i className="fas fa-cogs"></i>
                </div>
                <div className="pane-title mt20">Site Settings</div>
              </div>
            </Link>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;

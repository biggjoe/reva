import React from "react";
import Header from "../Header";
import HttpService from "../../services/HttpService";
import SideNav from "./SideNav";
import Link from "next/link";
import { Breadcrumbs } from "@mui/material";

const Layout = ({ children, page_data }) => {
  //console.log(page_data);
  return (
    <>
      <Header border_bottom={true} />
      <section className="white-main">
        <section className="whitepaper-body-container">
          <div className="whitepaper-side-nav">
            <SideNav page_data={page_data} />
          </div>
          <div className="whitepaper-page-content">
            <div className="card-content">
              <div className="page-head border-bottom">
                <div className="flex flex-row-resp">
                  <div className="inline-block px20 pt20">
                    <Breadcrumbs
                      aria-label="breadcrumb"
                      sx={{
                        width: "100%",
                        fontSize: "90% !important",
                        fontStyle: "italic",
                      }}
                    >
                      <Link href="/whitepaper">Whitepaper</Link>
                      {page_data?.mode === "sub" && (
                        <Link href={`/whitepaper/${page_data?.category_slug}`}>
                          {page_data?.category_title || "..."}
                        </Link>
                      )}
                      <span>{page_data?.title || ".."}</span>
                    </Breadcrumbs>
                    <h2 className="mt0">{page_data?.title || "Loading"}</h2>
                  </div>
                </div>
              </div>
              {children}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default React.memo(Layout);

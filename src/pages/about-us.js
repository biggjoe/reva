import React from "react";
import useFetchPage from "../hooks/useFetchPage";
import * as processHtml from "../services/processHtml";
import { Card, LinearProgress } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageTop from "../components/PageTop";

const About = () => {
  const { decodeHtml } = processHtml;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { page, loaded_page, loading_page } = useFetchPage({ slug: "about" });
  return (
    <React.Fragment>
      <Header />
      <section className="dashboard-pane">
        <div className="container py30">
          <Card sx={{ borderRadius: "0" }}>
            <PageTop
              page_data={page}
              loaded_page={loaded_page}
              loading_page={loading_page}
            />

            <section className="pxy20">
              {loading_page && <LinearProgress />}
              {loaded_page && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(page.description),
                  }}
                ></div>
              )}
            </section>
          </Card>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default About;

import Header from "./Header";
import Footer from "./Footer";
import { Breadcrumbs, Card } from "@mui/material";
import Link from "next/link";

export default function PageLayout({
  children,
  page_data,
  loading_page,
  loaded_page,
}) {
  return (
    <>
      <Header />
      <section className="dashboard-pane">
        <div className="container py30">
          <Card sx={{ borderRadius: "0" }}>
            <div className="page-head bg-grax">
              <div className="flex flex-row-resp">
                <div className="inline-block pxy20">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Link href="/">Home</Link>
                    <span>{loading_page ? "Loading..." : page_data.title}</span>
                  </Breadcrumbs>
                  <h2 className="mt20">
                    {loading_page ? "Loading..." : page_data.title}
                  </h2>
                </div>
              </div>
            </div>

            <div className="pxy20">{children}</div>
          </Card>
        </div>
      </section>

      <Footer />
    </>
  );
}

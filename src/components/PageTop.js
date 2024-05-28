import Link from "next/link";
import { Breadcrumbs, Card } from "@mui/material";

export default function PageTop({ page_data, loading_page, loaded_page }) {
  return (
    <>
      <div className="page-head">
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
    </>
  );
}

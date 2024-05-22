import React from "react";
import { LinearProgress } from "@mui/material";
import * as processHtml from "../../services/processHtml";

export default function Home() {
  const { decodeHtml } = processHtml;
  const { page, loaded_page, loading_page } = useFetchPage({
    slug: "whitepaper",
  });

  return (
    <div className="pxy20">
      {loading_page && <LinearProgress />}
      {!loading_page && loaded_page && (
        <div
          dangerouslySetInnerHTML={{
            __html: page?.decodeHtml(description),
          }}
        ></div>
      )}
    </div>
  );
}

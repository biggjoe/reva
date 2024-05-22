import React, { useCallback } from "react";
import Layout from "./Layout";
import { LinearProgress } from "@mui/material";
import * as processHtml from "../../services/processHtml";
import HttpService from "../../services/HttpService";

export default function Category(props) {
  const { mode, slug, return_page } = props;

  const { decodeHtml } = processHtml;
  const [whitepaper, setWhitepaper] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [pageLoaded, setPageLoaded] = React.useState(false);
  const [page_data, setPageData] = React.useState({});
  React.useEffect(() => {
    if (mode && slug) {
      getWhitepaper(slug, mode);
    }
  }, [slug, mode]);

  const getWhitepaper = (slug, mode) => {
    setLoading(true);
    setLoaded(false);

    HttpService.getWhitepaperPage({ mode: mode, slug: slug })
      .then(
        (result) => {
          setPageLoaded(true);
          if (result.data) {
            let page = result.data;
            page.description = decodeHtml(page.description);
            setWhitepaper(page);
            return_page({
              title: page.title,
              slug: page.slug,
              category_title: page.category_title,
              category_slug: page.category_slug,
            });
          } else {
            setWhitepaper({});
          }
        },
        (error) => {
          setWhitepaper([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  return (
    <div className="pxy20">
      {loading && <LinearProgress />}
      {!loading && pageLoaded && (
        <div
          dangerouslySetInnerHTML={{
            __html: whitepaper?.description,
          }}
        ></div>
      )}
    </div>
  );
}

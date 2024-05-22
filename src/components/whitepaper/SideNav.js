import React, { useCallback } from "react";
import Link from "next/link";
import PlaceHolder from "../PlaceHolder";
import HttpService from "../../services/HttpService";

const SideNav = ({ page_data }) => {
  console.log(page_data);
  const [whitepaper, setWhitepaper] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    listwhitepaper();
  }, []);

  const listwhitepaper = useCallback(() => {
    setLoading(true);
    setLoaded(false);
    HttpService.listWhitepaper()
      .then(
        (result) => {
          console.log("side nav data::", result);
          if (Array.isArray(result.data)) {
            setWhitepaper(result.data);
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }, [setWhitepaper]);
  return (
    <>
      <ul className="whitepaper-list">
        {!whitepaper && <PlaceHolder type="side_nav_list" />}
        {whitepaper && Array.isArray(whitepaper) && (
          <>
            {whitepaper.map((item) => (
              <li key={item.title}>
                <Link
                  className={
                    (page_data.mode === "category" &&
                      page_data.slug === item.slug) ||
                    page_data.category_slug === item.slug
                      ? "active"
                      : ""
                  }
                  href={`/whitepaper/${item.slug}`}
                >
                  <span className="uppercase">{item.title}</span>
                </Link>
                <ul>
                  {item.sub.map((itm) => (
                    <li key={itm.title}>
                      <Link
                        className={
                          page_data.mode === "sub" &&
                          page_data.slug === itm.slug
                            ? "active"
                            : ""
                        }
                        href={`/whitepaper/${item.slug}/${itm.slug}`}
                      >
                        {itm.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default React.memo(SideNav);

import React from "react";
import HttpService from "../services/HttpService";

const useFetchPage = (props) => {
  const { slug } = props;
  const [page, setPage] = React.useState({});
  const [loading_page, setLoading] = React.useState(false);
  const [loaded_page, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (slug && !loaded_page) {
      listpage();
    }
  }, [slug, loaded_page]);

  const listpage = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.getPage(slug)
      .then(
        (result) => {
          setLoading(false);
          console.log(result);
          if (result.status === 1) {
            setPage(result.data);
          } else {
            setPage({});
          }
        },
        (error) => {
          setPage({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(false);
      }); //fetch
  }; //doAjax

  return { page, loading_page, loaded_page };
};

export default useFetchPage;

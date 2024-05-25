import React from "react";
import HttpService from "../services/HttpService";

const useFetchWhitepaperCategories = () => {
  const [whitepaper_categories, setCats] = React.useState([]);
  const [loading_cats, setLoading] = React.useState(false);
  const [loaded_cats, setLoaded] = React.useState(false);

  React.useEffect(() => {
    getCats();
  }, []);

  const getCats = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.listWhitepaperCategories()
      .then(
        (result) => {
          setCats(result.data);
        },
        (error) => {
          setCats([]);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  return { whitepaper_categories, loading_cats, loaded_cats };
};

export default useFetchWhitepaperCategories;

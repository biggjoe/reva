import HttpService from "../services/HttpService";
import React from "react";

const useFetchSiteSettings = () => {
  const [settings, setSettings] = React.useState({});
  const [loading_settings, setLoading] = React.useState(false);
  const [loaded_settings, setLoaded] = React.useState(false);

  React.useEffect(() => {
    getSettings();
  }, []);

  const getSettings = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.postHeader("general", { mode: "site-settings" })
      .then(
        (result) => {
          setSettings(result);
        },
        (error) => {
          setSettings({});
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  return { settings, loading_settings, loaded_settings };
};

export default useFetchSiteSettings;

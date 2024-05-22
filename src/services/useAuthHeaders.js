import * as React from "react";

const useAuthHeader = () => {
  /*   const [token, setToken] = React.useState("");
  React.useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);
 */
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }
  return {
    Authorization: "Bearer " + token,
  };
};

export default useAuthHeader;

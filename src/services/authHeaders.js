const authHeader = async () => {
  const rets = () => {
    return localStorage.getItem("access_token");
  };

  return {
    Authorization: "Bearer " + rets(),
  };
};

export default authHeader;

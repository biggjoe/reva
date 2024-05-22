import React from "react";
import useAuthService from "./useAuthService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const [user_loaded, setUserLoaded] = React.useState(false);
  const [user_data, setUser] = React.useState({
    user: null,
    isLogged: false,
    expire_at: "",
    access_token: "",
    isLoaded: false,
  });
  const AuthServ = useAuthService();
  const usd = AuthServ.getCurrentUser();
  React.useEffect(() => {
    if (usd) {
      setUser({ ...usd, isLoaded: true });
    }
    setUserLoaded(true);
  }, [usd]);

  return (
    <UserContext.Provider value={{ user_data, setUser, user_loaded }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

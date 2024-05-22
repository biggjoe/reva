import HttpService from "./HttpService";

const clr = (myResolve, myReject) => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("expire_at");
  myResolve(1); // when successful
  myReject(0); // when error
};

const useAuthService = () => {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : {};

  const logout = () => {
    return new Promise(clr);
  };

  const getCurrentUser = () => {
    return user;
  };

  const reset_user = (token) => {
    let cur_user = getCurrentUser();
    cur_user["jwt"] = token;
    localStorage.setItem("user", JSON.stringify(cur_user));
    localStorage.setItem("access_token", token);
  };

  const isLogged = () => {
    let usr = getCurrentUser();
    if (usr) {
      if (Object.keys(usr).length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const checkSession = () => {
    return HttpService.getHeader("checkSession");
  };

  const regen_token = () => {
    let cur_user = getCurrentUser();
    console.log("cur_user::", cur_user);
    return HttpService.postHeader("regen-token", { id: cur_user["id"] }).then(
      (resp) => {
        console.log("regen_token::", resp);
        if (resp.status === 1) {
          localStorage.setItem("user", JSON.stringify(resp.user));
          localStorage.setItem("access_token", resp.jwt);
        }
      }
    );
  };

  return { logout, getCurrentUser, isLogged, checkSession, regen_token };
};

export default useAuthService;

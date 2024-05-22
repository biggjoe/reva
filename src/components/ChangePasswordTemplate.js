import * as React from "react";
import HttpService from "../services/HttpService";
import { Button } from "@mui/material";
import CustomModal from "./CustomModal";

const ChangePasswordTemplate = (props) => {
  console.log(props);
  const { fetched, user } = props;
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [data, setData] = React.useState(null);
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState({
    onopen: false,
    onclose: modalClose,
  });

  React.useEffect(() => {
    //setData(user);
  }, []);
  const handleInput = React.useCallback(
    (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData({ ...data, [name]: value });
      console.log(data);
    },
    [data]
  );

  const submit_handler = () => {
    console.log(data);
    setLoading(true);
    setLoaded(false);
    data.mode = "change"
    HttpService.changePassword(data)
      .then(
        (result) => {
          const severity =
            result.status === 1
              ? "success"
              : result.status === 0
              ? "error"
              : "info";
          setModal({
            ...modal_data,
            onopen: true,
            message: result.message,
            severity: severity,
            onclose: modalClose,
          });
          console.log("::|", result);
          if (result) {
            //setUser(result.data);
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  };
  return (
    <React.Fragment>
      {fetched && (
        <div className="pxy0">
          <div className="flex flex-row-resp align-items-center">
            <div className="input iconed spacer">
              <label>Old Password</label>
              <input
                type="password"
                name="old_password"
                className="input-form-control"
                placeholder="Old Password"
                onChange={handleInput}
              />
              <span className="input-icon">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div className="flex flex-row-resp align-items-center">
            <div className="input iconed spacer pr10">
              <label>New Password</label>
              <input
                type="password"
                name="new_password"
                className="input-form-control"
                placeholder="New Password"
                onChange={handleInput}
              />
              <span className="input-icon">
                <i className="fas fa-lock"></i>
              </span>
            </div>

            <div className="input iconed spacer">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="re_password"
                className="input-form-control"
                placeholder="Confirm New Password"
                onChange={handleInput}
              />
              <span className="input-icon">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div className="flex flex-row align-items-center">
            <span className="">
              <Button
                onClick={submit_handler}
                size="large"
                disabled={loading}
                variant="contained"
                type="submit"
              >
                {loading ? "Working..." : "Update Password"}
              </Button>
            </span>

            <span className="spacer"></span>
          </div>
        </div>
      )}
      <CustomModal data={modal_data} />
    </React.Fragment>
  );
};

export default React.memo(ChangePasswordTemplate);

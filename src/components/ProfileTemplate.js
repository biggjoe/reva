import * as React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import HttpService from "../services/HttpService";
import CustomModal from "./CustomModal";

const ProfileTemplate = (props) => {
  console.log(props);
  const qr_data = props;
  let { fetched, user } = props;
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [countries, setCountries] = React.useState([]);
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState({
    onopen: false,
    onclose: modalClose,
  });
  const dts = new Date(user.dateOfBirth);
  React.useEffect(() => {
    if (user) {
      setData({ ...user, dateOfBirth: new Date(user.dateOfBirth) });
    }
    fetch_countries();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const setUser = (user) => {
    const usr = JSON.stringify(user);
    localStorage.removeItem("user");
    localStorage.setItem("user", usr);
    user = user;
  };

  const fetch_countries = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.fetchCountries()
      .then(
        (response) => {
          console.log(response);
          if (response.status === 1) {
            setCountries(response.countries);
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };

  const submit_handler = () => {
    console.log(data);
    setLoading(true);
    setLoaded(false);
    HttpService.updateProfile(data)
      .then(
        (result) => {
          console.log("::|", result);
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
          if (result.user) {
            setUser(result.user);
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
          <div className="flex flex-row-resp align-items-center max-100">
            <div className="input iconed spacer pr10 max-100">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="input-form-control"
                placeholder="Full Name"
                onChange={handleInput}
                defaultValue={user.name}
              />
              <span className="input-icon">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <div className="input iconed spacer  max-100">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="input-form-control"
                placeholder="Enter Email"
                onChange={handleInput}
                defaultValue={user.email}
              />
              <span className="input-icon">
                <i className="fas fa-at"></i>
              </span>
            </div>{" "}
          </div>

          <div className="flex flex-row-resp align-items-center">
            <div className="input iconed spacer pr10">
              <label>Mobile Phone</label>
              <input
                type="text"
                name="mobile"
                className="input-form-control"
                placeholder="Mobile Phone"
                onChange={handleInput}
                defaultValue={user.mobile}
              />
              <span className="input-icon">
                <i className="fas fa-phone"></i>
              </span>
            </div>

            {/*  <div className="input iconed spacer">
              <label>Date of Birth</label>
              <input
                type="text"
                name="dateOfBirth"
                className="input-form-control"
                placeholder="Date of Birth"
                onChange={handleInput}
                defaultValue={user.dateOfBirth}
              />

              <span className="input-icon">
                <i className="fas fa-calendar"></i>
              </span>
            </div> */}

            <div className="input spacer">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3} sx={{ width: "100%" }}>
                  <DesktopDatePicker
                    label="Date of Birth"
                    inputFormat="MM/dd/yyyy"
                    value={data?.dateOfBirth}
                    onChange={(e) =>
                      setData({
                        ...data,
                        dateOfBirth: new Date(e).toISOString(),
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        className="input-form-control buy-input"
                        {...params}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </div>

          <div className={`flex flex-row-resp align-items-center`}>
            <div className={`input iconed spacer max-100`}>
              <span className="input-icon">
                <i
                  className={`fas ${
                    loading ? "fa-spin fa-circle-notch" : "fa-flag"
                  }`}
                ></i>
              </span>

              <label>Nationality</label>
              <select
                name="nationality"
                className="input-form-control"
                placeholder="Nationality"
                defaultValue={user.nationality}
                onChange={handleInput}
                disabled={loading}
              >
                {countries.map((item) => (
                  <option
                    key={item}
                    value={item}
                    selected={item === user.nationality}
                  >
                    {item}
                  </option>
                ))}
              </select>
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
                {loading ? "Working..." : "Update"}
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

export default React.memo(ProfileTemplate);

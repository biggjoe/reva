import * as React from "react";
import axios from "axios";
import HttpService from "../services/HttpService";
import { Button } from "@mui/material";
import CustomModal from "./CustomModal";
import LoadingModal from "./LoadingModal";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";

const ChangeAddressTemplate = (props) => {
  console.log(props);
  const qr_data = props;
  let { fetched, user } = props;
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [data, setData] = React.useState(user);
  const [currencies, setCurrencies] = React.useState([]);
  const [currency_fetched, setCurrencyFetched] = React.useState(false);

  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState({
    onopen: false,
    onclose: modalClose,
  });
  
  const closeLoader = () => setLoadData({ ...load_data, open: false });
  const [load_data, setLoadData] = React.useState({
    open: false,
    onclose: closeLoader,
  });
  React.useEffect(() => {
    //setData(user);
    if (!currency_fetched) {
      fetchCurrencies();
    }
  }, []);

  const fetchCurrencies = () => {
    setLoading(true);
    axios.post("https://api.oxapay.com/api/currencies", {}).then((response) => {
      console.log("NETWORKS:::", response);
      fix_keys(response.data.data);
    },(error)=>{
      console.log(error)
      let Err = ()=>{return <span className="color-red spacer">{error.message}</span>;}
      setLoadData({
        ...load_data,
        open: true,
        message: <Err/>,
        severity: 0,
        mode: "component",
        onclose: closeLoader,
      });
    });
  };

  const fix_keys = (arr) => {
    let cura = [{ name: "Select Wallet type", symbol: null }];
    let kx = 0;
    for (let [key, value] of Object.entries(arr)) {
      let obj = {
        name: arr[key]["name"],
        symbol: arr[key]["symbol"],
        status: arr[key]["status"],
      };
      if (arr[key]["symbol"] === user.walletType) {
        setPayCurrency(arr[key]["symbol"]);
        setSelectedIndex(kx + 1);
      }
      const nw = arr[key]["networkList"];
      let lst = [];
      for (let [ky, vl] of Object.entries(nw)) {
        lst.push(nw[ky]);
      }
      obj.network_list = lst;
      cura.push(obj);
      kx++;
    }
    console.log("cura::", cura);
    setCurrencies(cura);
    setLoading(false);
    setCurrencyFetched(true);
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [pay_currency, setPayCurrency] = React.useState(null);
  const handleMenuItemClick = (item, index) => {
    console.log(item);
    if (item !== null) {
      setSelectedIndex(index);
      setPayCurrency(item.symbol);
      setPayNetwork(null);
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [pay_network, setPayNetwork] = React.useState(null);
  const [selectedNIndex, setSelectedNIndex] = React.useState(0);
  const handleNetworkChange = (e) => {
    const val = e.target.value;
    console.log(val, typeof val);
    if (val !== 0) {
      setPayNetwork(e.target.value);
    }
  };

  const setUser = (user) => {
    const usr = JSON.stringify(user);
    localStorage.removeItem("user");
    localStorage.setItem("user", usr);
    user = user;
  };
  const submit_handler = () => {
    setLoading(true);
    setLoaded(false);
    const obj = {
      ...data,
      walletNetwork: pay_network,
      walletType: pay_currency,
    };
    console.log(obj);
    HttpService.updateProfile(obj)
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
          {currency_fetched && (
            <>
              <Box sx={{ minWidth: "100%", maxWidth: "100%" }}>
                <div className="input bordered  border-radius mb20">
                  <label>Wallet type</label>
                  <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClickListItem}
                    secondaryAction={
                      open ? (
                        <ArrowDropUpOutlined sx={{ fontSize: "25px" }} />
                      ) : (
                        <ArrowDropDownOutlined sx={{ fontSize: "25px" }} />
                      )
                    }
                  >
                    <ListItemText
                      primary={
                        <span>
                          {currencies[selectedIndex]["name"]} (
                          {currencies[selectedIndex]["symbol"]})
                        </span>
                      }
                    />
                  </ListItem>
                </div>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "lock-button",
                    role: "listbox",
                  }}
                >
                  <MenuItem onClick={() => setPayCurrency(user.walletType)}>
                    {user.walletType}
                  </MenuItem>
                  {currencies.map((item, index) => (
                    <MenuItem
                      key={item.symbol}
                      onClick={() => handleMenuItemClick(item, index)}
                    >
                      {`${item.name} ${item.symbol ? `(${item.symbol})` : ``}`}
                    </MenuItem>
                  ))}
                </Menu>
                {pay_currency && (
                  <>
                    <div className="input bordered mt10 border-radius">
                      <label>Network</label>
                      <select
                        className="input-form-control"
                        style={{
                          padding: "9px 20px 9px 7px",
                          borderRadius: "2px",
                          marginTop: "5px",
                          marginBottom: "5px",
                          outline: "0",
                          border: "1px solid transparent",
                        }}
                        onChange={handleNetworkChange}
                      >
                        <option defaultValue={user.walletNetwork}>
                          Select Network
                        </option>
                        {currencies[selectedIndex]["network_list"].map(
                          (itm, indx) => (
                            <option value={itm.network} key={itm.network}>
                              {`${itm.network}`}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </>
                )}
              </Box>
            </>
          )}
          {pay_currency && pay_network && (
            <>
              <div className="input iconed spacer">
                <label>Wallet Address</label>
                <input
                  type="text"
                  name="walletAddress"
                  className="input-form-control"
                  placeholder="Wallet Address"
                  defaultValue={user.walletAddress}
                  onChange={handleInput}
                />
                <span className="input-icon">
                  <i className="fa-solid fa-bitcoin-sign"></i>
                </span>
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
                    {loading ? "Working..." : "Update Address"}
                  </Button>
                </span>
              </div>
            </>
          )}
        </div>
      )}
            {loading && (
              <div className="pxy20 text-center txt-lg">Loading currencies...</div>
            )}
            
 {load_data?.open &&  <LoadingModal data={load_data} />}
      <CustomModal data={load_data} />
    </React.Fragment>
  );
};

export default React.memo(ChangeAddressTemplate);

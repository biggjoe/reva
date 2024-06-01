import React from "react";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dashboard from "@mui/icons-material/Dashboard";
import Settings from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import AccountBox from "@mui/icons-material/AccountBox";
import Newspaper from "@mui/icons-material/Newspaper";
import ListAltOutlined from "@mui/icons-material/ListAltOutlined";
import PhotoAlbumOutlined from "@mui/icons-material/PhotoAlbumOutlined";
import MailOutline from "@mui/icons-material/MailOutline";
import {
  LogoutOutlined,
  NotificationsOutlined,
  PaymentOutlined,
  PaymentsOutlined,
  SupportAgentOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import FontAwesome from "react-fontawesome";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "0",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminSidePanel = (props) => {
  let { onopen, onclose, toggleDrawer, DrawerHeader, doLogout } = props;

  const pages = [
    {
      path: "dashboard",
      title: "Dashboard ",
      navItem: true,
      icon: <Dashboard />,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },

    {
      path: "affiliate",
      title: "Affiliate",
      icon: <FontAwesome name="users" style={{ fontSize: "20px" }} />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },

    {
      path: "transactions",
      title: "Transactions",
      icon: <PaymentsOutlined />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "pages",
      title: "Pages",
      icon: <FontAwesome name="file" style={{ fontSize: "20px" }} />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "whitepaper",
      title: "Whitepaper",
      icon: <Newspaper />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
    {
      path: "faq",
      title: "FAQ",
      icon: <FontAwesome name="question-circle" style={{ fontSize: "22px" }} />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },

    {
      path: "site",
      title: "Site Settings",
      icon: <Settings />,
      navItem: true,
      data: { mustAuth: true, isAdmin: false, showSideNav: false },
    },
  ];

  const togg = () => {
    onclose();
  };
  return (
    <React.Fragment>
      <Drawer variant="permanent" open={onopen} onClose={onclose}>
        <DrawerHeader />
        <Divider />

        <List>
          {pages.map(
            (item, index) =>
              item.path !== "" &&
              item.navItem &&
              item.path !== "*" && (
                <ListItem
                  key={item.path}
                  disablePadding
                  sx={{
                    textDecoration: "none",
                    color: "#222222",
                    fontWeight: "900 !important",
                  }}
                  component={Link}
                  href={`/admin/${item.path}`}
                >
                  <ListItemButton onClick={togg}>
                    <Tooltip
                      title={item.title}
                      placement="right-start"
                      arrow
                      followCursor
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                    </Tooltip>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
        <Divider />
        <List sx={{ p: "0", m: "0" }}>
          <ListItem
            disablePadding
            button
            onClick={() => doLogout()}
            sx={{ fontWeight: "900" }}
          >
            <ListItemButton>
              <Tooltip
                title={"Log Out"}
                placement="right-start"
                arrow
                followCursor
              >
                <ListItemIcon>
                  <LogoutOutlined sx={{ color: "red" }} />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default AdminSidePanel;

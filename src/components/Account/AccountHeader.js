import React from "react";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#0052fe",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const AccountHeader = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { open, toggleDrawer, DrawerHeader, doLogout, usr } = props;
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        paddingLeft: "0px",
        paddingRight: "0px",
        boxShadow: "none",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          flexGrow: 1,
          pl: "20px",
          pr: "20px",
        }}
      >
        <IconButton
          size="large"
          onClick={toggleDrawer}
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ display: { xs: "flex", md: "block", sm: "flex" }, mr: 1 }}
        >
          {open ? <ChevronLeft /> : <MenuOutlined />}
        </IconButton>

        <span className="dashboard-logo">
          <Link href="/">
            <img src="/images/logo2.png" alt="Logo" />
          </Link>
        </span>

        <div style={{ flexGrow: 1, display: "flex" }}></div>

        <Box
          sx={{
            flexGrow: 0,
            m: "0",
            display: {
              xs: "inline-flex",
              sm: "inline-flex",
              md: "inline-flex",
            },
          }}
        >
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Menu"
                sx={{ border: "2px solid #fff" }}
                src={
                  usr && usr.avatar
                    ? `${process.env.REACT_APP_SERVER_DOMAIN + usr.avatar}`
                    : `/images/avatar.jpg`
                }
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AccountHeader;

import React from "react";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { AccountBox, Dashboard, LogoutOutlined } from "@mui/icons-material";

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
    console.log("currentTarget:", event.currentTarget);
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleUserMenu = (event) => {
    if (anchorElUser) {
      setAnchorElUser(null);
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };
  const pages = [
    {
      path: "dashboard",
      component: "Dashboard",
      icon: <Dashboard />,
    },
    { path: "profile", component: "My Profile", icon: <AccountBox /> },
  ];
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
            <IconButton onClick={toggleUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Menu"
                sx={{ border: "2px solid #fff" }}
                src={
                  usr && usr.avatar
                    ? `${process.env.NEXT_PUBLIC_SERVER_DOMAIN + usr.avatar}`
                    : `/images/avatar.jpg`
                }
              />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ m: "0", p: "0 !important" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
          >
            {/*  <Paper sx={{ width: "auto", maxWidth: "100%" }}> */}
            <div className="account-drop">
              <div className="email-space">{usr.email}</div>
              <div className="balance-space">
                <span className="tkn-desc">Token Balance</span>
                <h2>{usr.tokenBalance}</h2>
              </div>
            </div>
            {pages.map((item, index) => (
              <MenuItem key={index} sx={{ py: "0", px: "10px", m: "0" }}>
                <ListItem
                  disablePadding
                  button
                  key={item.id}
                  sx={{ margin: "0px" }}
                  component={Link}
                  href={item.path === "/" ? "../" : `${item.path}`}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.component}</ListItemText>
                </ListItem>
              </MenuItem>
            ))}
            <MenuItem sx={{ py: "0", px: "10px", m: "0" }}>
              <ListItem disablePadding onClick={() => doLogout()}>
                <ListItemIcon>
                  <LogoutOutlined sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText>LOG OUT</ListItemText>
              </ListItem>
            </MenuItem>
            {/* </Paper> */}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AccountHeader;

import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItem from "./ListItem";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { ListItem as ListItemMUI, ListItemIcon } from "@mui/material/";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import { useStore } from "../../stores/store";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const drawerWidth: number = 230;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

export default observer(function SideBar({ open, toggleDrawer }: Props) {
  const {
    userStore: { user, logout },
  } = useStore();

  const sideMenuItems = [
    { label: "Dashboard", Icon: <DashboardIcon />, to: "/dashboard" },
    { label: "My Properties", Icon: <MenuBookIcon />, to: "/myProperties" },
    { label: "Applications", Icon: <ViewListIcon />, to: "/applications" },
  ];
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{ position: "fixed", height: "100vh", zIndex: 20 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {sideMenuItems.map((item) => (
          <ListItem
            key={item.label}
            label={item.label}
            icon={item.Icon}
            to={item.to}
          />
        ))}
      </List>
      <Divider />
      <List
        style={{ overflow: "hidden", position: "relative", height: "100%" }}
      >
        <ListItemMUI component={Link} to={`/profiles/${user?.username}`}>
          <ListItemAvatar>
            <Avatar alt={user?.displayName} src={user?.image}></Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{
              wordWrap: "break-word",
              wordBreak: "break-all",
              overflow: "hidden",
              color: "black",
            }}
            primary={
              <div style={{ wordBreak: "break-all" }}>{user?.displayName}</div>
            }
          />
        </ListItemMUI>
        <ListItemMUI
          className="logoutButton"
          style={{ position: "absolute", bottom: 0 }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            style={{ cursor: "pointer" }}
            primary="Logout"
            onClick={logout}
          />
        </ListItemMUI>
      </List>
    </Drawer>
  );
});

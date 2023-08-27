import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/Home";
import Content from "./Content";
import NavBar from "./NavBar";
import SideBar from "./Sidebar";
import theme from "../theme/myTheme";
import { ToastContainer } from "react-toastify";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const mdTheme = createTheme();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading bumipro..." />;

  return (
    <>
      <ModalContainer></ModalContainer>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        theme="colored"
      ></ToastContainer>
      {location.pathname === "/" ? (
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={mdTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <NavBar open={open} toggleDrawer={toggleDrawer} />
            <SideBar open={open} toggleDrawer={toggleDrawer} />
            <Content>
              <Outlet />
            </Content>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
}

export default observer(App);

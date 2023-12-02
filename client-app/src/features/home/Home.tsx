import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import LoginForm from "../../users/LoginForm";
import RegisterForm from "../../users/RegisterForm";
import "./home.css";
import { ModalSize } from "../../stores/modalStore";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();

  function handleLogin() {
    modalStore.openModal("Login", <LoginForm />);
  }

  function handleRegister() {
    modalStore.openModal("Register", <RegisterForm />, ModalSize.large);
  }

  return (
    <Box
      sx={{
        //background: "linear-gradient(135deg, #3C3B3F, #605C3C, #A5A04A)",
        //height: "100vh",
        background: "rgb(215 199 184 / 50%)",
        overflowY: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        //sx={{ paddingTop: "80px", paddingBottom: "100px" }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box
              className="logo-name"
              sx={{
                height: "10vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {userStore.isLoggedIn ? (
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "normal",
                    fontSize: "2.75rem",
                    marginLeft: "20px",
                    color: "#362d28",
                  }}
                >
                  Welcome to Bumipro
                </Typography>
              ) : (
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "normal",
                    fontSize: "2.75rem",
                    marginLeft: "20px",
                    color: "#362d28",
                  }}
                >
                  Bumipro
                </Typography>
              )}
            </Box>
            <Box
              className="menu-bar"
              sx={{
                height: "10vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12} md={12} className="menu-list">
                <Box>Properties</Box>
                <Box>About</Box>
                <Box>Contact</Box>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box className="img-portada" sx={{ height: "100%" }}>
              <img
                //src="https://via.placeholder.com/500x500"
                src="https://cdn.pixabay.com/photo/2016/04/18/08/50/kitchen-1336160_1280.jpg"
                alt="Real Estate Application"
                //style={{ maxWidth: "100%", objectFit: "contain" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              className="text-portada"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  marginBottom: "40px",
                  color: "#362d28",
                  textAlign: "left",
                }}
              >
                Take control of your properties with Bumipro. List your
                properties with ease, and easily manage applications from
                potential tenants who are interested in your properties. With
                our platform, you'll have everything you need to make informed
                decisions and keep your properties running smoothly.
              </Typography>
              {!userStore.isLoggedIn ? (
                <div>
                  <Button
                    className="btn-login"
                    variant="contained"
                    sx={{ marginRight: "10px" }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button
                    className="btn-register"
                    variant="contained"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                </div>
              ) : (
                <Button
                  className="btn-register"
                  component={Link}
                  to="/dashboard"
                  variant="contained"
                >
                  Go to my properties
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
});

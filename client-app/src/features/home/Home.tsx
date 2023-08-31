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

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();

  function handleLogin() {
    modalStore.openModal("Login", <LoginForm />);
  }

  function handleRegister() {
    modalStore.openModal("Register", <RegisterForm />);
  }

  return (
    <Box
      sx={{
        //background: "linear-gradient(135deg, #3C3B3F, #605C3C, #A5A04A)",
        //height: "100vh",
        background: "#798baddb",
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
                  className="text-dark"
                  sx={{
                    fontWeight: "bold",
                    marginLeft: "20px",
                    color: "#fff",
                  }}
                >
                  Welcome to Bumipro
                </Typography>
              ) : (
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "normal",
                    marginLeft: "20px",
                    color: "#fff",
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
              <Grid item xs={12} className="menu-list">
                <Box>Properties</Box>
                <Box>About</Box>
                <Box>Contact</Box>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="img-portada" sx={{ height: "100%" }}>
              <img
                //src="https://via.placeholder.com/500x500"
                src="https://cdn.pixabay.com/photo/2019/12/17/04/52/lounge-4700728_960_720.jpg"
                alt="Real Estate Application"
                //style={{ maxWidth: "100%", objectFit: "contain" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ marginBottom: "40px", color: "#fff", textAlign: "left" }}
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

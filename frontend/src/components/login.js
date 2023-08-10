import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginForm, useLogin } from "react-admin";
import { Login } from "react-admin";
import RegisterForm from "./registerForm";
import { WithGlow } from "./WIthGlow";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={1}
      {...props}
    >
      Made with &hearts; by
      <a
        className="TrackTechLK-Link"
        color="inherit"
        href="https://github.com/TrackTechLK"
      >
        TrackTech
      </a>{" "}
      {new Date().getFullYear()}
      {" ©."}
    </Typography>
  );
}

const theme = createTheme();

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const login = useLogin();

  const handleGoogleLogin = () => {
    setLoading(true);
    login({ provider: "google" });
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    console.log({ value });
  }, [value]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        /> */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <div
            style={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              style={{
                minHeight: "100vh",
                placeContent: "center",
                display: "flex",
              }}
            >
              <div
                style={{
                  // overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  placeContent: "center",
                }}
              >
                <WithGlow>
                  <motion.div layout>
                    <Card
                      className="glass"
                      style={{
                        padding: 40,
                        // backgroundColor: "rgba(255,255,255,0.7)",
                      }}
                      // elevation={5}
                    >
                      <Logo />
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                          >
                            <Tab label="Login" {...a11yProps(0)} />
                            <Tab label="Register" {...a11yProps(1)} />
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                          <Box
                            style={{
                              alignContent: "center",
                              justifyContent: "center",
                            }}
                          >
                            <LoginForm />
                          </Box>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                          <Box
                            style={{
                              alignContent: "center",
                              justifyContent: "center",
                            }}
                          >
                            <RegisterForm setValue={setValue} />
                          </Box>
                        </CustomTabPanel>
                      </Box>
                      <Button onClick={handleGoogleLogin}>
                        {loading && (
                          <CircularProgress
                            sx={{ marginRight: 1 }}
                            size={18}
                            thickness={2}
                            color="success"
                          />
                        )}
                        Login With Google
                      </Button>
                      {/* <Copyright /> */}
                    </Card>
                  </motion.div>
                </WithGlow>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

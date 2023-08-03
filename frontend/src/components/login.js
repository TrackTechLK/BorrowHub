import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import { Login, LoginForm } from "react-admin";
import RegisterForm from "./registerForm";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      display={"flex"}
      flexDirection={"row"}
      {...props}
    >
      <p>Made with &hearts; by </p>
      <a
        color="inherit"
        //   href="https://mui.com/"
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
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
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
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
              <Card style={{ padding: 40 }} elevation={5}>
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
                      <RegisterForm />
                    </Box>
                  </CustomTabPanel>
                </Box>
                {/* <Copyright /> */}
              </Card>
            </div>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

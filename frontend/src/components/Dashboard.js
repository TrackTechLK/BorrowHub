import Timeline from "./Timeline/Timeline";
import { Title, useSidebarState } from "react-admin";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import welcomeAnimation from "./../assets/animations/welcome_animation.json";

const Dashboard = () => {
  const sm = 4;
  const style = {
    minHeight: 200,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    borderRadius: 20,
    flexDirection: "column",
    variant: "outlined",
  };

  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [open, setOpen] = useSidebarState();

  useEffect(() => {
    const val = localStorage.getItem("initial");

    if (val != "1") {
      if (isFirst) {
        setWelcomeVisible(true);
        setOpen(false);
        setTimeout(() => {
          setWelcomeVisible(false);
          setTimeout(() => {
            setOpen(true);
          }, 1000);
          setIsFirst(false);
          localStorage.setItem("initial", "1");
        }, 5000);
      }
    }
  }, []);

  return (
    <Card style={{ padding: 20}}>
      <Title title="Welcome!" />
      {welcomeVisible && (
        <Lottie
          loop={false}
          style={{ height: 500 }}
          animationData={welcomeAnimation}
          onAnimationIteration={() => {
            setTimeout(() => {
              setWelcomeVisible(false);
            }, 100);
          }}
        />
      )}
      {/* <Card style={style}> */}
      <motion.div layout transition={{ duration: 1 }}>
        <Divider textAlign="center">
          <Typography variant="h5">Global stats</Typography>
        </Divider>
        <Grid container style={{ margin: 10 }}>
          {[
            ["Items lent", 12304],
            ["Items borrowed", 43261],
            ["Communities", 4391],
            ["Users", 243238],
          ].map((item) => {
            return (
              <Grid item md={3} sm={sm}>
                <Card style={style} variant="outlined">
                  <Typography variant="h3">
                    <CountUp end={item[1]} start={!welcomeVisible} />
                  </Typography>
                  <Typography variant="h6" color="error" textAlign={'center'}>
                    {item[0]}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Divider textAlign="center">
          <Typography variant="h5">Your stats</Typography>
        </Divider>
        <Grid container style={{ margin: 10 }}>
          {[
            ["Items lent", 120],
            ["Items borrowed", 500],
            ["Communities joined", 125],
            ["New friends", 20],
          ].map((item) => {
            return (
              <Grid item md={3} sm={sm}>
                <Card style={style} variant="outlined">
                  <Typography variant="h3">
                    <CountUp end={item[1]} start={!welcomeVisible} />
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {item[0]}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {/* </Card> */}
        <Grid container>
          <Grid item md={6}>
            <Divider textAlign="center">
              <Typography variant="h5">Your actions</Typography>
            </Divider>
            <CardContent style={{ maxHeight: 500, overflowX: "scroll" }}>
              <Timeline />
            </CardContent>
          </Grid>
          <Grid item md={6}>
            <Divider textAlign="center">
              <Typography variant="h5">Friends actions</Typography>
            </Divider>
            <CardContent style={{ maxHeight: 500, overflowX: "scroll" }}>
              <Timeline />
            </CardContent>
          </Grid>
        </Grid>
      </motion.div>
    </Card>
  );
};

export default Dashboard;

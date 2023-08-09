import Timeline from "./Timeline/Timeline";
import { Title } from "react-admin";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Dashboard = () => {
  return (
    <Card>
      <Title title="Welcome to the administration" />
      <CardContent>
        <Timeline />
      </CardContent>
    </Card>
  );
};

export default Dashboard;

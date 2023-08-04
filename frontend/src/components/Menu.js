import { Menu } from "react-admin";
import LabelIcon from "@mui/icons-material/Label";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const AwesomeDivider = ({ title }) => {
  return (
    <Divider textAlign="left">
      <Typography
        // sx={{ mt: 0.5, ml: 2 }}
        color="text.secondary"
        display="block"
        variant="caption"
      >
        {title}
      </Typography>
    </Divider>
  );
};

export const CustomMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <AwesomeDivider title={"Users"} />
    <Menu.ResourceItem name="users" />
    <AwesomeDivider title={"Items"} />
    <Menu.ResourceItem name="categories" />
    <Menu.ResourceItem name="items" />
    <AwesomeDivider title={"Social"} />
    <Menu.ResourceItem name="communities" />
    <AwesomeDivider title={"Others"} />
    <Menu.ResourceItem name="borrowrequests" />
    <Menu.ResourceItem name="lendconfirmations" />
    <Menu.ResourceItem name="returnconfirmations" />
    <Menu.ResourceItem name="community_requests" />
    <Menu.ResourceItem name="user_communities" />
    {/* <Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />}/> */}
  </Menu>
);

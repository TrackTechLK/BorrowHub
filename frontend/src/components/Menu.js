import { Count, Menu } from "react-admin";
import LabelIcon from "@mui/icons-material/Label";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { WithGlow } from "./WIthGlow";

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

const menuItems = [
  <Menu.DashboardItem />,
  <AwesomeDivider title={"Users"} />,

  <Menu.ResourceItem name="users" />,

  <AwesomeDivider title={"Items"} />,
  <Menu.ResourceItem name="borrows">
    ,
    <Count filter={{}} />,
  </Menu.ResourceItem>,
  <Menu.ResourceItem name="categories" />,
  <Menu.ResourceItem name="items" />,
  <Menu.ResourceItem name="itemtypes" />,
  <AwesomeDivider title={"Social"} />,
  <Menu.ResourceItem name="communities" />,
  <AwesomeDivider title={"Others"} />,
  <Menu.ResourceItem name="borrowrequests" />,
  <Menu.ResourceItem name="lendconfirmations" />,
  <Menu.ResourceItem name="returnconfirmations" />,
  <Menu.ResourceItem name="community_requests" />,
  <Menu.ResourceItem name="user_communities" />,
];

export const CustomMenu = () => (
  <Menu>
    {/* <Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />}/> */}
    {menuItems.map((item) => (
      <motion.div
        whileHover={{ scale: 1.1, translateX: 5 }}
        whileTap={{ scale: 1.1 }}
        // drag="x"
        // dragConstraints={{ left: -100, right: 100 }}
      >
        <WithGlow>
          {item}
          </WithGlow>
      </motion.div>
    ))}
  </Menu>
);

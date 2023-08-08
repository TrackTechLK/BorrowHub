import { Count, Menu, useGetList, useSidebarState } from "react-admin";
import LabelIcon from "@mui/icons-material/Label";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { WithGlow } from "./WIthGlow";
import { Fragment } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

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

const SubMenu = ({
  handleToggle,
  isOpen,
  name,
  icon,
  children,
  hidden,
  title,
}) => {
  return (
    <Fragment>
      <Collapse hidden={hidden} in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style={{ paddingLeft: 40 }}>
          {!hidden ? children : null}
        </List>
      </Collapse>
    </Fragment>
  );
};

export const CustomMenu = () => {
  const { data, total, isLoading, error } = useGetList("my_communities");
  const [open, setOpen] = useSidebarState();

  const menuItems = [
    [<Menu.DashboardItem />, true],
    [<AwesomeDivider title={"Users"} />, false],

    [<Menu.ResourceItem name="users" />, true],

    [<AwesomeDivider title={"Items"} />, false],
    [
      <Menu.ResourceItem name="borrows">
        ,
        <Count filter={{}} />,
      </Menu.ResourceItem>,
      true,
    ],
    [<Menu.ResourceItem name="categories" />, true],
    [<Menu.ResourceItem name="items" />, true],
    [<Menu.ResourceItem name="itemtypes" />, true],
    [<AwesomeDivider title={"Social"} />, false],
    [<Menu.ResourceItem name="my_communities" />, true],
    [
      <SubMenu isOpen={open}>
        {data?.map((community) => (
          <motion.div
            whileHover={{ scale: 1.1, translateX: 5 }}
            whileTap={{ scale: 1.1 }}
            // drag="x"
            // dragConstraints={{ left: -100, right: 100 }}
          >
            <WithGlow>
              <Menu.Item
                title={community.name}
                primaryText={community.name}
                to={`/communities/${community.id}/show`}
                sx={{
                  fontSize: "0.9rem",
                }}
              />
            </WithGlow>
          </motion.div>
        ))}
      </SubMenu>,
      false,
    ],
    [
      <Menu.Item
        // title={"Join a community"}
        primaryText={"Join a community"}
        to={`/communities/`}
        leftIcon={<GroupAddIcon />}
      />,
      true,
    ],
    [<Divider />, false],
    [((<AwesomeDivider title={"Others"} />), false)],
    [<Menu.ResourceItem name="borrowrequests" />, true],
    [<Menu.ResourceItem name="lendconfirmations" />, true],
    [<Menu.ResourceItem name="returnconfirmations" />, true],
    [<Menu.ResourceItem name="community_requests" />, true],
    [((<Menu.ResourceItem name="user_communities" />), true)],
  ];

  return (
    <Menu>
      {/* <Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />}/> */}
      {menuItems.map((item) => (
        <div>
          {item &&
            (item[1] ? (
              <motion.div
                whileHover={{ scale: 1.1, translateX: 5 }}
                whileTap={{ scale: 1.1 }}
                // drag="x"
                // dragConstraints={{ left: -100, right: 100 }}
              >
                <WithGlow>{item[0]}</WithGlow>
              </motion.div>
            ) : (
              item[0]
            ))}
        </div>
      ))}
    </Menu>
  );
};

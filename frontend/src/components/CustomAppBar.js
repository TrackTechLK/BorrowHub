import * as React from "react";
import { AppBar, Title } from "react-admin";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { WithGlow } from "./WIthGlow";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Messenger from "../chat/src/components/Messenger";
import { HelpDialog } from "./HelpDialog";
import "./AppBar.css";
const ChatButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <ChatIcon fontSize="small" />
      </IconButton>
      <Drawer
        className="chatbox"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div className="chat">
          <Messenger />
        </div>
      </Drawer>
    </>
  );
};

export const CustomAppBar = () => (
  <AppBar>
    {/* <TitlePortal /> */}
    <Typography variant="h6" id="react-admin-title" />
    <Box flex="1" />
    <WithGlow>
      <Typography
        sx={{
          fontSize: "1.5rem",
        }}
      >
        BorrowHub
      </Typography>
    </WithGlow>
    <Box flex="2" />
    <ChatButton />
    <HelpDialog/>
  </AppBar>
);

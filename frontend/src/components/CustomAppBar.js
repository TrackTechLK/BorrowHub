import * as React from "react";
import { AppBar, Title } from "react-admin";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { WithGlow } from "./WIthGlow";

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
  </AppBar>
);

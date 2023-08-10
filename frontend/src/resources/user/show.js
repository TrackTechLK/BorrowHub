import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Avatar,
  CardHeader,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Brightness5RoundedIcon from "@mui/icons-material/Brightness5Rounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { Rating } from "@mui/material";
import React from "react";
import {
  Button,
  Datagrid,
  Loading,
  ReferenceField,
  ReferenceManyField,
  Show,
  TabbedShowLayout,
  useShowContext,
  TextField,
} from "react-admin";
import { Chip } from "@mui/material";
import { CommunityListView } from "../community/list";

const UserShowHeader = () => {
  const { isLoading, record } = useShowContext();
  console.log(record);

  if (isLoading) return <Loading />;

  return (
    <Card variant={"outlined"}>
      <CardMedia
        component="img"
        height="140"
        src={`https://source.unsplash.com/random?sig=${record.id}`}
        title="green iguana"
      />
      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {record.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {record.email}
        </Typography>
        <Divider />
        <Typography variant="body2" color="text.secondary">
          Courtesy Rating:
        </Typography>
        <Rating name="read-only" value={4} readOnly size="small" />
        <Divider />
        <Typography variant="body2" color="text.secondary">
          Badges Earned:
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            variant="outlined"
            color="primary"
            size="small"
            icon={<AutoAwesomeRoundedIcon />}
            label="Benevolent"
          />
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<Brightness5RoundedIcon />}
            label="Angelic"
          />
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<StarsRoundedIcon />}
            label="Charitable"
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export const UserShow = () => {
  return (
    <Show>
      <UserShowHeader />

      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Communities">
          <ReferenceManyField
            reference="communities"
            target="users"
            label={false}
          >
            <CommunityListView />
          </ReferenceManyField>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};

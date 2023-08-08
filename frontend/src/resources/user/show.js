import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
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
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {record.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {record.email}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
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

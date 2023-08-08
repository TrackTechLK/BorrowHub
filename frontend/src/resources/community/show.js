import {
  Datagrid,
  ReferenceManyField,
  RichTextField,
  Show,
  TabbedShowLayout,
  TextField,
  useUpdate,
  useRecordContext,
  useGetRecordId,
  useRefresh,
  WithRecord,
  SimpleShowLayout,
  useShowContext,
  Loading,
  Error,
} from "react-admin";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { BorrowRequestListView } from "../borrowrequest/list";

const MakeAdminButton = (record) => {
  const [update, { isLoadingUpdate, errorUpdating }] = useUpdate();

  // console.log(record);

  const onClick = () => {
    console.log("update");
    //create returnconfirmation
    update("user_communities", {
      id: record.id,
      data: { user: record.user, community: record.community, is_admin: true },
    });
  };

  return (
    <Button variant="contained" onClick={onClick} disabled={record.is_admin}>
      Make admin
    </Button>
  );
};

const RemoveAdminButton = (record) => {
  const [update, { isLoadingUpdate, errorUpdating }] = useUpdate();
  const refresh = useRefresh();

  // console.log(record);

  const onClick = () => {
    console.log("update");
    //create returnconfirmation
    update("user_communities", {
      id: record.id,
      data: { user: record.user, community: record.community, is_admin: false },
    }).then(() => {
      refresh();
    });
  };

  return (
    <Button variant="contained" onClick={onClick} color="error">
      Remove
    </Button>
  );
};

const CommunityShowHeader = () => {
  const {
    defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
    error, // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onError` side effect.
    isFetching, // boolean that is true while the record is being fetched, and false once the record is fetched
    isLoading, // boolean that is true until the record is available for the first time
    record, // record fetched via dataProvider.getOne() based on the id from the location
    refetch, // callback to refetch the record via dataProvider.getOne()
    resource, // the resource name, deduced from the location. e.g. 'posts'
  } = useShowContext();
  console.log({ record });

  const navigate = useNavigate();

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
          {record.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {record.category_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Created by ${record.creator_username} on ${record.created_date}`}
        </Typography>
        <span dangerouslySetInnerHTML={{ __html: record.description }} />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            navigate("/borrowrequests/create", {
              state: { community: record.id },
            });
          }}
        >
          New borrow request
        </Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
      {/* <CardContent> </CardContent> */}
    </Card>
  );
};

export const CommunityShow = () => {
  const communityId = useGetRecordId();

  return (
    <div>
      <Show>
        {/* <img
          src="https://source.unsplash.com/random"
          height={100}
          width={"100%"}
          style={{ flex: 1 }}
        /> */}
        <CommunityShowHeader />
        {/* <SimpleShowLayout>
          <TextField source="creator_username" />
        </SimpleShowLayout> */}
        <TabbedShowLayout>
          <TabbedShowLayout.Tab label="posts">
            <ReferenceManyField
              reference="borrowrequests"
              target="borrow_requests"
              label={false}
            >
              <BorrowRequestListView />
              {/* <Datagrid>
                <TextField source="username" />
                <WithRecord label="Name" render={MakeAdminButton} />
              </Datagrid> */}
            </ReferenceManyField>
            {/* <TextField label="Id" source="id" />
            <TextField source="name" /> */}
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="users" path="users">
            <ReferenceManyField
              reference="user_communities"
              target="community"
              label={false}
            >
              <Datagrid>
                <TextField source="username" />
                <WithRecord label="Name" render={MakeAdminButton} />
              </Datagrid>
            </ReferenceManyField>
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="admins" path="admins">
            <ReferenceManyField
              reference="user_communities"
              target="commmunity"
              label={false}
              filter={{ is_admin: true }}
            >
              <Datagrid>
                <TextField source="username" />
                <WithRecord label="Name" render={RemoveAdminButton} />
              </Datagrid>
            </ReferenceManyField>
          </TabbedShowLayout.Tab>
        </TabbedShowLayout>
      </Show>
    </div>
  );
};

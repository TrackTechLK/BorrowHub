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
  useCreate,
  useNotify,
  useDelete,
} from "react-admin";
import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { BorrowRequestListView } from "../borrowrequest/list";
import { makeStyles } from "@mui/material/styles";
import { motion, LayoutGroup } from "framer-motion";

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

  const [create] = useCreate();
  const [deleteRecord] = useDelete();
  const notify = useNotify();

  const onJoin = () => {
    create(
      "community_requests",
      { data: { community: record.id } },
      {
        onSuccess: () => {
          notify("Requested to join the community");
        },
        onError: () => {
          notify("Error joining the community", {
            type: "error",
          });
        },
      }
    );
  };

  const styles = {
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    card: {
      position: "relative",
    },
    overlay: {
      position: "absolute",
      bottom: "0px",
      // left: "20px",
      color: "black",
      backgroundColor: "white",
    },
  };

  if (isLoading) return <Loading />;

  // return (
  //   <Card style={styles.card}>
  //     <CardMedia
  //       image={`https://source.unsplash.com/random?sig=${record.id}`}
  //       style={styles.media}
  //     />
  //     <div style={styles.overlay}>this text should overlay the image</div>
  //   </Card>
  // );

  return (
    <Card variant={"outlined"}>
      <div style={styles.card}>
        <LayoutGroup key={`community-${record.id}`}>
          <motion.div
            key={`community-${record.id}`}
            layout
            transition={{ duration: 0.3 }}
          >
            <CardMedia
              component="img"
              height="400"
              src={`https://source.unsplash.com/random?sig=${record.id}`}
              title="green iguana"
            />
          </motion.div>
        </LayoutGroup>
        <motion.div
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0.5, scaleY: 1 }}
          animate={{ opacity: 1, scaleY: 1, animation: { duration: 2000 } }}
          exit={{ opacity: 0.5, scaleY: 1, animation: { duration: 2000 } }}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "transparent",
            padding: 20,
          }}
          className="glass-wo-radius"
        >
          <Typography gutterBottom variant="h5" component="div">
            {record.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {record.category_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Created by ${record.creator_username} on ${record.created_date}`}
          </Typography>
        </motion.div>
      </div>
      <CardContent>
        <span dangerouslySetInnerHTML={{ __html: record.description }} />
      </CardContent>
      <CardActions>
        {record.is_joined ? (
          <span>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                navigate("/borrow_requests/create", {
                  state: { community: record.id },
                });
              }}
              sx={{ mr: 1, ml: 1 }}
            >
              New borrow request
            </Button>
            <Button size="small" variant="outlined" color="error">
              Leave
            </Button>
          </span>
        ) : (
          <Button size="small" variant="outlined" onClick={onJoin}>
            Join
          </Button>
        )}
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
      {/* <CardContent> </CardContent> */}
    </Card>
  );
};

const CommunityTabs = () => {
  const {
    defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
    error, // error returned by dataProvider when it failed to fetch the record. Useful if you want to adapt the view instead of just showing a notification using the `onError` side effect.
    isFetching, // boolean that is true while the record is being fetched, and false once the record is fetched
    isLoading, // boolean that is true until the record is available for the first time
    record, // record fetched via dataProvider.getOne() based on the id from the location
    refetch, // callback to refetch the record via dataProvider.getOne()
    resource, // the resource name, deduced from the location. e.g. 'posts'
  } = useShowContext();

  return (
    <TabbedShowLayout>
      {record.is_joined ? (
        <TabbedShowLayout.Tab label="posts">
          <ReferenceManyField
            reference="borrow_requests"
            target="community"
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
      ) : null}
      <TabbedShowLayout.Tab
        label="users"
        path={record.is_joined ? "users" : null}
      >
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
      :
      <TabbedShowLayout.Tab label="admins" path="admins">
        <ReferenceManyField
          reference="user_communities"
          target="community"
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
  );
};

export const CommunityShow = () => {
  const communityId = useGetRecordId();

  return (
    <div>
      <Show emptyWhileLoading>
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
        <CommunityTabs />
      </Show>
    </div>
  );
};

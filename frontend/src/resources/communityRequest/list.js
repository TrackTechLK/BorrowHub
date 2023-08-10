import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  useCreate,
  WithRecord,
  useUpdate,
  useRefresh,
  useNotify,
  ChipField,
} from "react-admin";
import Button from "@mui/material/Button";
import { Chip } from "@mui/material";

const StatusChip = (record) => {
  let chipColor;
  if (record.status === "PENDING"){
      chipColor = "primary"
  }else if (record.status === "ACCEPTED"){
    chipColor = "success"
  }else if (record.status === "DECLINED"){
    chipColor = "error"
  }
  
  return(
    <Chip label = {record.status} color={chipColor}/>
  )
}

const AcceptButton = (record) => {
  console.log(record);

  const [create, { isLoading, error }] = useCreate();
  const refresh = useRefresh();
  const notify = useNotify();

  const onAccept = () => {
    console.log("accept");
    //TODO change status to accepted
    create(
      "user_communities",
      {
        data: {
          user: record.user,
          community: record.community,
          is_admin: false,
          community_request_id: record.id,
        },
      },
      {
        onSuccess: (data) => {
          refresh();
          notify("Accepted to community");
        },
        onError: (error) => {
          notify(`Error accepting request: ${error.message}`, {
            type: "error",
          });
        },
      }
    );
  };

  return (
    <Button
      variant="contained"
      onClick={onAccept}
      disabled={record.status != "PENDING"}
    >
      Accept
    </Button>
  );
};

const DeclineButton = (record) => {
  console.log(record);

  const [update, { isLoading, error }] = useUpdate();

  const onDecline = () => {
    console.log("update");
    //TODO change status to accepted
    update("community_requests", {
      id: record.id,
      data: { status: "DECLINED" },
    });
  };

  return (
    <Button
      variant="contained"
      onClick={onDecline}
      color="error"
      disabled={record.status != "PENDING"}
    >
      Decline
    </Button>
  );
};

export const CommunityRequestList = () => (
  <List>
    <Datagrid>
      {/* <TextField source="id" /> */}
      <ReferenceField source="user" reference="users">
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField source="community" reference="communities">
        <TextField source="name" />
      </ReferenceField>
      <WithRecord label="status" render={StatusChip} />
      <WithRecord label="Accept" render={AcceptButton} />
      <WithRecord label="Decline" render={DeclineButton} />
    </Datagrid>
  </List>
);

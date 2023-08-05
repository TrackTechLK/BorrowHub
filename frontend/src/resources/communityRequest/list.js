import {
    List,
    Datagrid,
    TextField,
    DateField,
    BooleanField,
    ReferenceField,
    useCreate,
    FunctionField
  } from "react-admin";
  import Button from "@mui/material/Button";

const AcceptButton = (record) => {
  console.log(record);

  const [create, { isLoading, error }] = useCreate();

  const onAccept = () => {
    console.log("update");
    //TODO change status to accepted
    create("user_communities", {
      data: { user: record.user, community: record.community, is_admin: false },
    });
  };

  return (
    <Button variant="contained" onClick={onAccept}>
      Accept
    </Button>
  );
};



  const DeclineButton = (record) => {
    console.log(record);
  
    const [create, { isLoading, error }] = useCreate()
  
    const onDecline = () => {
      console.log("decline");
      //create returnconfirmation
      // create('returnconfirmations', {data: {returned: true, received: false, borrow: record.id}})
    };
  
    return (
      <Button variant="contained" onClick={onDecline} color="error">
        Decline
      </Button>
    );
  };
  
export const CommunityRequestList = () => (
    <List>
      <Datagrid>
        <TextField source="id" />
        <ReferenceField source="user" reference="users"/>
        <ReferenceField source="community" reference="communities" />
        <FunctionField label="Name" render={AcceptButton} />
        <FunctionField label="Name" render={DeclineButton} />
      </Datagrid>
    </List>
  );


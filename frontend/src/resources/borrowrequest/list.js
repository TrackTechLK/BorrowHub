import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  
  useCreate,
  useUpdate,
  WithRecord,
} from "react-admin";
import Button from "@mui/material/Button";

const AcceptButton = (record) => {
  console.log(record);

  const [create, { isLoading, error }] = useCreate();
  const [update, { isLoadingUpdate, errorUpdating }] = useUpdate();

  const onAccept = () => {
    console.log("update");
    //create returnconfirmation
    create("lendconfirmations", {
      data: { borrow_request: record.id, lent: true, received: false },
    });
    update("borrowrequests", { id: record.id, data: { accepted: true } });
  };

  return (
    <Button variant="contained" onClick={onAccept} disabled={record.accepted}>
      Accept
    </Button>
  );
};

export const BorrowRequestList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="item_type" />
      <TextField source="description" />
      <BooleanField source="accepted" />
      <WithRecord label="Name" render={AcceptButton} />
    </Datagrid>
  </List>
);

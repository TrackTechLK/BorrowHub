import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  useCreate,
  useUpdate,
  useDelete,
  FunctionField,
} from "react-admin";
import Button from "@mui/material/Button";

const ConfirmButton = (record) => {
  console.log(record);

  const [update, { isLoading, error }] = useUpdate();

  const onConfirm = () => {
    console.log("update");
    //create returnconfirmation
    update("returnconfirmations", {
      id: record.id,
      data: { received: true, received_date: new Date() },
      previousData: record,
    });
  };

  return (
    <Button variant="contained" onClick={onConfirm} disabled={record.received}>
      Confirm
    </Button>
  );
};

const DeclineButton = (record) => {
  console.log(record);

  const [deleteOne, { data, isLoading }] = useDelete();

  const onDecline = () => {
    deleteOne("returnconfirmations", {
      id: record.id,
    });
  };

  return (
    <Button variant="contained" color="error" onClick={onDecline} disabled={record.received}>
      Decline
    </Button>
  );
};

export const ReturnConfirmationList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="borrow" />
        <BooleanField source="returned" />
        <BooleanField source="received" />
        <DateField source="lent_date" />
        <DateField source="received_date" />
        <FunctionField label="Name" render={ConfirmButton} />
        <FunctionField label="Name" render={DeclineButton} />
      </Datagrid>
    </List>
  );
};

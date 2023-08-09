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
  WithRecord,
} from "react-admin";
import Button from "@mui/material/Button";

const ConfirmButton = (record) => {
  console.log(record);

  const [update, { isLoading, error }] = useUpdate();

  const onConfirm = () => {
    //TODO change current_user on item create to null
    update("borrows", {
      id: record.borrow,
      data: { state: "RETURNED" },
    });
    update("return_confirmations", {
      id: record.id,
      data: { received: true, received_date: new Date() },
      previousData: record,
    });
    update("items", {
      id: record.item,
      data: { current_user: null },
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
  const [update] = useUpdate();

  const onDecline = () => {
    deleteOne("return_confirmations", {
      id: record.id,
    });
    update("borrows", {
      id: record.borrow,
      data: { state: "BORROWED" },
    });
  };

  return (
    <Button
      variant="contained"
      color="error"
      onClick={onDecline}
      disabled={record.received}
    >
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
        <DateField source="returned_date" />
        <BooleanField source="received" />
        <DateField source="received_date" />
        <WithRecord label="Name" render={ConfirmButton} />
        <WithRecord label="Name" render={DeclineButton} />
      </Datagrid>
    </List>
  );
};

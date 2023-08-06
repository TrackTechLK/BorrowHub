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
import { toDateString } from "../../utils/datetime";

const AcceptButton = (record) => {
  console.log(record);

  const [create, { isLoading, error }] = useCreate();
  const [update, { isLoadingUpdate, errorUpdating }] = useUpdate();

  const onAccept = () => {
    console.log("update");
    //create returnconfirmation
    create("borrows", { data: {borrower: record.borrower, item: record.item} });
    update("lendconfirmations", {
      id: record.id,
      data: { received: true, received_date: toDateString(new Date()) },
    });
    update("items", {
      id: record.item,
      data: { current_user: record.borrower },
    });
  };

  return (
    <Button variant="contained" onClick={onAccept}>
      Accept
    </Button>
  );
};

export const LentConfirmationList = () => (
  <List>
    <Datagrid>
      <TextField source="borrow_request" />
      <TextField source="lent" />
      <TextField source="item" />
      <TextField source="borrower" />
      <TextField source="received" />
      <DateField source="lent_date" />
      <DateField source="received_date" />
      <WithRecord label="Name" render={AcceptButton} />
    </Datagrid>
  </List>
);

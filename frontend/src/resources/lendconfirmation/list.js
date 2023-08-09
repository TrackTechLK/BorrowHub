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
    create("borrows", {
      data: { borrower: record.borrower, item: record.item },
    });
    update("lend_confirmations", {
      id: record.id,
      data: { received: true, received_date: toDateString(new Date()) },
    });
    update("items", {
      id: record.item,
      data: { current_user: record.borrower },
    });
  };

  return (
    <Button variant="contained" onClick={onAccept} disabled={record.received}>
      Accept
    </Button>
  );
};

export const LentConfirmationList = () => (
  <List>
    <Datagrid>
      {/* <TextField source="borrow_request" /> */}
      <ReferenceField source="lender" reference="users">
        <TextField source="username" />
      </ReferenceField>
      <BooleanField source="lent" />
      <TextField source="item_name" />
      {/* <ReferenceField source="item" reference="item_types">
        <TextField source="item_name" />
      </ReferenceField> */}
      <DateField source="lent_date" />
      <BooleanField source="received" />

      <DateField source="received_date" />
      <WithRecord label="Name" render={AcceptButton} />
    </Datagrid>
  </List>
);

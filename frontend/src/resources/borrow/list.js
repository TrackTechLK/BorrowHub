import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
  useUpdate,
  useCreate,
  WithRecord,
} from "react-admin";
import Button from "@mui/material/Button";

const ReturnButton = (record) => {
  console.log(record);

  const [create, { isLoading, error }] = useCreate();
  const [update] = useUpdate();

  const onReturn = () => {
    console.log("update");
    //create returnconfirmation
    create("return_confirmations", {
      data: { returned: true, received: false, borrow: record.id },
    });
    update("borrows", { id: record.id, data: { state: "PENDING_RETURN" } });
  };

  return (
    <Button
      variant="contained"
      onClick={onReturn}
      disabled={record.state != "BORROWED"}
    >
      Return
    </Button>
  );
};

export const BorrowList = () => (
  <List>
    <Datagrid>
      {/* <TextField source="id" /> */}
      {/* <TextField source="item_user_id" /> */}
      <ReferenceField reference='items' source='item'>
        <ReferenceField reference='item_types' source='item_type'>
          <TextField source='name' />
        </ReferenceField>
      </ReferenceField>
      {/* <TextField source="borrower" /> */}
      <ReferenceField reference="users" source='borrower'>
        <TextField source="username"/>
      </ReferenceField>
      <TextField source="state" />
      <DateField source="borrow_date" />
      <WithRecord label="Name" render={ReturnButton} />
    </Datagrid>
  </List>
);

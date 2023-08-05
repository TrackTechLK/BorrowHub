import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from "react-admin";

export const BorrowRequestList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="item" />
      <TextField source="description" />
      <BooleanField source="accepted" />
    </Datagrid>
  </List>
);

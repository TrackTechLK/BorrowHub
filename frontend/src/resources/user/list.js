import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />

      <TextField source="username" />

      <TextField source="email" />
    </Datagrid>
  </List>
);

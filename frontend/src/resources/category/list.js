import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from "react-admin";

export const CategoryList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="parent" reference="categories" />
    </Datagrid>
  </List>
);

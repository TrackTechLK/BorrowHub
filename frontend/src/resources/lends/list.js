import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from "react-admin";

export const LendList = () => (
  <List>
    <Datagrid>
      {/* <TextField source="id" /> */}
      <ReferenceField source="item_type" reference="item_types">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="owner" />
      <TextField source="current_user" />
    </Datagrid>
  </List>
);

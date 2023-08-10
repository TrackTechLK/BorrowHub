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
      <ReferenceField reference="users" source="owner">
        <TextField source="username" />
      </ReferenceField>
      <ReferenceField reference="users" source="current_user">
        <TextField source="username" />
      </ReferenceField>
    </Datagrid>
  </List>
);

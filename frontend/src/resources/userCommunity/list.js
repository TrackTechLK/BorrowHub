import {
    List,
    Datagrid,
    TextField,
    DateField,
    BooleanField,
    ReferenceField,
  } from "react-admin";


export const UserCommunityList = () => (
    <List>
      <Datagrid rowClick={'edit'}>
        <TextField source="id" />
        <ReferenceField source="user" reference="users"/>
        <ReferenceField source="community" reference="communities" />
        <BooleanField source="is_admin" />
      </Datagrid>
    </List>
  );

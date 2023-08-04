import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from "react-admin";

export const CommunityList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="creator" reference="users"/>
      <DateField source="created_date" locales="fr-FR" />
      <ReferenceField source="category" reference="categories" />
    </Datagrid>
  </List>
);

export const CommunityRequestList = () => (
    <List>
      <Datagrid>
        <TextField source="id" />
        <ReferenceField source="user" reference="users"/>
        <ReferenceField source="community" reference="communities" />
      </Datagrid>
    </List>
  );

export const UserCommunityList = () => (
    <List>
      <Datagrid>
        <TextField source="id" />
        <ReferenceField source="user" reference="users"/>
        <ReferenceField source="community" reference="communities" />
        <BooleanField source="is_admin" />
      </Datagrid>
    </List>
  );



export const CategoryList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="parent" reference="categories" />
    </Datagrid>
  </List>
);

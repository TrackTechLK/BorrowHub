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
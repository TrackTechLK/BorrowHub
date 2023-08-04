import {
    List,
    Datagrid,
    TextField,
    DateField,
    BooleanField,
    ReferenceField,
  } from "react-admin";

  
export const CommunityRequestList = () => (
    <List>
      <Datagrid>
        <TextField source="id" />
        <ReferenceField source="user" reference="users"/>
        <ReferenceField source="community" reference="communities" />
      </Datagrid>
    </List>
  );


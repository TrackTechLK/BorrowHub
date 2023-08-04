import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from "react-admin";
import EfficientReferenceField from "../../components/EfficientReferenceField";

export const CommunityList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      {/* <ReferenceField source="creator" reference="users" /> */}
      <EfficientReferenceField
        label="Creator"
        reference={"users"}
        sourceField={"creator_username"}
        idField={"creator"}
      />
      <DateField source="created_date" locales="fr-FR" />
      {/* <ReferenceField source="category" reference="categories" /> */}
      <EfficientReferenceField
        label={"Categories"}
        reference={"categories"}
        sourceField={"category_name"}
        idField={"category"}
      />
    </Datagrid>
  </List>
);
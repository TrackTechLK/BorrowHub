import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from "react-admin";
import EfficientReferenceField from "../../components/EfficientReferenceField";

export const CategoryList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      {/* <ReferenceField source="parent" reference="categories" /> */}
      <EfficientReferenceField
        reference={"categories"}
        idField={"parent"}
        sourceField={"parent_name"}
        label="Parent"
      />
    </Datagrid>
  </List>
);

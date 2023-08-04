import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from 'react-admin';

export const ItemList = () => (
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='name' />
      <TextField source='category' />
      <ReferenceField source='parent' reference='items' />
    </Datagrid>
  </List>
);
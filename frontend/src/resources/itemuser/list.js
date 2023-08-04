import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from 'react-admin';

export const ItemUserList = () => (
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='item' />
      <TextField source='owner' />
      <TextField source='current_user' />
      <ReferenceField source='parent' reference='itemusers' />
    </Datagrid>
  </List>
);

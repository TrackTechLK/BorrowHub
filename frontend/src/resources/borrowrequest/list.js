import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from 'react-admin';

export const BorrowRequestList = () => (
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='item_id' />
      <TextField source='description' />
      <DateField source='accepted' />
      <ReferenceField source='parent' reference='borrowrequests' />
    </Datagrid>
  </List>
);

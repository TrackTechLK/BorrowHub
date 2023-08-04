import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from 'react-admin';

export const LentConfirmationList = () => (
  <List>
    <Datagrid>
      <TextField source='borrow_request' />
      <TextField source='lent' />
      <TextField source='received' />
      <DateField source='lent_date' />
      <DateField source='received_date' />
      <ReferenceField source='parent' reference='lendconfirmations' />
    </Datagrid>
  </List>
);

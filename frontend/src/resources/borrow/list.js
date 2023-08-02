import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from 'react-admin';

export const BorrowList = () => (
  <List>
    <Datagrid>
      <TextField source='id' />
      <TextField source='item_user_id' />
      <TextField source='borrower' />
      <DateField source='borrow_date' />
      <ReferenceField source='parent' reference='borrows' />
    </Datagrid>
  </List>
);

import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from 'react-admin';

export const ReturnConfirmationList = () => (
  <List>
    <Datagrid>
      <TextField source='borrow' />
      <BooleanField source='returned' />
      <BooleanField source='received' />
      <DateField source='lent_date' />
      <DateField source='received_date' />
      <ReferenceField source='parent' reference='returnconfirmations' />
    </Datagrid>
  </List>
);

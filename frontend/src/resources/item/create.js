import * as React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
  Toolbar,
  SaveButton,
} from 'react-admin';
import ItemTypeReferenceInput from '../itemType/referenceInput';

const validateForm = (values) => {
  const errors = {};
  if (!values.item_type) {
    errors.item_type = ['Item type is required'];
  }
  return errors;
};

const MyToolbar = () => (
  <Toolbar>
    <SaveButton alwaysEnable />
  </Toolbar>
);

export const ItemCreate = () => (
  <Create>
    <SimpleForm toolbar={<MyToolbar />} validate={validateForm}>
      <ItemTypeReferenceInput
        source='item_type'
        reference='item_types'
        allowEmpty
        validate={required()}
        perPage={10000}
      />
    </SimpleForm>
  </Create>
);

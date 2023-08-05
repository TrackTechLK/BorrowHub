import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
} from "react-admin";
import ItemTypeReferenceInput from "../itemType/referenceInput";

const validateForm = (values) => {
  const errors = {};
  if (!values.item_type) {
    errors.item_type = ["Item type is required"];
  }
  return errors;
};

export const ItemCreate = () => (
  <Create>
    <SimpleForm validate={validateForm}>
      <ItemTypeReferenceInput
        source="item_type"
        reference="itemtypes"
        allowEmpty
        validate={required()}
        perPage={10000}
      />
    </SimpleForm>
  </Create>
);

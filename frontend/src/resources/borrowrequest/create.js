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
import { ItemCreate } from "../item/create";
import ItemTypeReferenceInput from "../itemType/referenceInput";

export const BorrowRequestCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <ItemTypeReferenceInput
        source='item_type'
        reference='itemtypes'
        allowEmpty
        validate={required()}
        perPage={10000}
      />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);

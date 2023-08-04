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

export const ItemCreate = () => (
  <Create>
    <SimpleForm>
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

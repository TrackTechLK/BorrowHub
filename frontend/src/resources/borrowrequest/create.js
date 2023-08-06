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

export const BorrowRequestCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="item_type" reference="itemtypes">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);

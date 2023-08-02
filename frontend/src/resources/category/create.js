import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import ToxicityDetectedInput from "../../components/ToxicityDetectedInput";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <ToxicityDetectedInput source="name" validate={required()} />
      <ReferenceInput source="parent" reference="categories">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

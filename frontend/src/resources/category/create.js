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

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="parent" reference="categories">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="image_url" type="url" />
    </SimpleForm>
  </Create>
);

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
import { useLocation } from "react-router-dom";

export const BorrowRequestCreate = () => {
  const { state } = useLocation();
  const { community } = state; // Read values passed on state
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    if (community) {
      setDisabled(true);
    }
  }, [community]);

  return (
    <Create>
      <SimpleForm defaultValues={{ community: community }}>
        <ReferenceInput source="community" reference="communities">
          <AutocompleteInput optionText="name" disabled={disabled} />
        </ReferenceInput>
        <ItemTypeReferenceInput
          source="item_type"
          reference="itemtypes"
          allowEmpty
          validate={required()}
          perPage={10000}
        />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
};

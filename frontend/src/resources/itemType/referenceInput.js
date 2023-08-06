import React, { useState, useCallback } from "react";
import { ReferenceInput, AutocompleteInput, required } from "react-admin";
import ItemTypeQuickCreateButton from "./quickCreate";
import { Stack } from "@mui/material";

const ItemTypeReferenceInput = (props) => {
  const [version, setVersion] = useState(0);
  const handleChange = useCallback(() => setVersion(version + 1), [version]);
  const { validate } = props;

  return (
    <Stack direction={'row'}>
      <ReferenceInput key={version} {...props}>
        <AutocompleteInput optionText="name" validate={validate} />
      </ReferenceInput>

      <ItemTypeQuickCreateButton onChange={handleChange} />
    </Stack>
  );
};

export default ItemTypeReferenceInput;

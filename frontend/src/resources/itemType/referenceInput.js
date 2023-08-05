import React, { useState, useCallback } from "react";
import { ReferenceInput, AutocompleteInput, required } from "react-admin";
import ItemTypeQuickCreateButton from "./quickCreate";

const ItemTypeReferenceInput = (props) => {
  const [version, setVersion] = useState(0);
  const handleChange = useCallback(() => setVersion(version + 1), [version]);
  const { validate } = props;

  return (
    <div>
      <ReferenceInput key={version} {...props}>
        <AutocompleteInput optionText="name" validate={validate} />
      </ReferenceInput>

      <ItemTypeQuickCreateButton onChange={handleChange} />
    </div>
  );
};

export default ItemTypeReferenceInput;

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  required,
  Button,
  SaveButton,
  TextInput,
  useCreate,
  useNotify,
  Form,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import IconContentAdd from "@mui/icons-material/Add";
import IconCancel from "@mui/icons-material/Cancel";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

function ItemTypeQuickCreateButton({ onChange }) {
  const [showDialog, setShowDialog] = useState(false);
  const [create, { loading }] = useCreate("item_types");
  const notify = useNotify();
  const { setValue } = useFormContext();

  const handleClick = () => {
    setShowDialog(true);
  };

  const handleCloseClick = () => {
    setShowDialog(false);
  };

  const handleSubmit = async (values) => {
    create(
      "item_types",
      { data: values },
      {
        onSuccess: (data) => {
          console.log({ data });
          setShowDialog(false);
          setValue("item_type", data.id);

          onChange();
        },
        onFailure: ({ error }) => {
          notify(error.message, "error");
        },
      }
    );
  };

  return (
    <>
      <Button onClick={handleClick} label="ra.action.create">
        <IconContentAdd />
      </Button>
      <Dialog
        fullWidth
        open={showDialog}
        onClose={handleCloseClick}
        aria-label="Create Item Type"
      >
        <DialogTitle>Create Item Type</DialogTitle>

        <Form resource="item_types" onSubmit={handleSubmit}>
          <>
            <DialogContent
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextInput source="name" validate={required()} />
              <ReferenceInput
                source="category"
                reference="categories"
                validate={required()}
              >
                <AutocompleteInput optionText="name" validate={required()} />
              </ReferenceInput>
            </DialogContent>
            <DialogActions>
              <Button
                label="ra.action.cancel"
                onClick={handleCloseClick}
                disabled={loading}
              >
                <IconCancel />
              </Button>
              <SaveButton disabled={loading} />
            </DialogActions>
          </>
        </Form>
      </Dialog>
    </>
  );
}

export default ItemTypeQuickCreateButton;

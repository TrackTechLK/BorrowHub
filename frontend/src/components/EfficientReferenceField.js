import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import { useRecordContext } from "react-admin";
import { useNavigate } from "react-router-dom";

const EfficientReferenceField = ({
  reference,
  sourceField,
  idField,
  required = true,
}) => {
  // njf
  // FileSystemFileEntryfr

  // frejw fkr

  const record = useRecordContext();
  const navigate = useNavigate();

  const onClick = () => {
    if (record[idField]) {
      try {
        navigate(`/${reference}/${record[idField]}`);
      } catch (e) {
        console.error("Cannot redirect. no reference exists");
      }
    }
  };

  return <Button onClick={onClick}>{record[sourceField]}</Button>;
};
export default EfficientReferenceField;

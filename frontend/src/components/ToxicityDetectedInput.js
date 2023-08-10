import { useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import LoadingButton from "@mui/lab/LoadingButton";

import { useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";
import * as tf from "@tensorflow/tfjs";

const threshold = 0.8;

tf.getBackend();

const ToxicityDetectedInput = ({ label, source, required = true }) => {
  const input = useController({
    name: source,
    defaultValue: "",
    required: required,
    rules: {
      required: true,
    },
  });

  const [tempEvent, setTempEvent] = useState("");
  const [open, setOpen] = useState(false);
  const [toxicities, setToxicities] = useState([]);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setTempEvent(e);
    setChanged(true);
  };

  const onCheckForToxicity = () => {
    setLoading(true);
    toxicity.load(threshold).then((model) => {
      //   const sentences = ["you suck"];

      model.classify([tempEvent?.target?.value]).then((predictions) => {
        // `predictions` is an array of objects, one for each prediction head,
        // that contains the raw probabilities for each input along with the
        // final prediction in `match` (either `false` or `true`).
        // If neither prediction exceeds the threshold, `match` is `null`.

        console.log(predictions);
        const detections = [];

        predictions.map((prediction) => {
          if (prediction.results[0].match) {
            detections.push(prediction.label);
          }
        });

        setToxicities(detections);

        console.log({ detections });

        if (detections.length > 0) {
          handleClickOpen();
          setLoading(false);
          return;
        }

        input.field.onChange(tempEvent);
        setLoading(false);
        setChanged(true);

        /*
          prints:
          {
            "label": "identity_attack",
            "results": [{
              "probabilities": [0.9659664034843445, 0.03403361141681671],
              "match": false
            }]
          },
          {
            "label": "insult",
            "results": [{
              "probabilities": [0.08124706149101257, 0.9187529683113098],
              "match": true
            }]
          },
          ...
           */
      });
    });
  };

  return (
    <span style={{ alignContent: "center", justifyContent: "center" }}>
      <TextField
        {...input.field}
        type="text"
        placeholder={source || label}
        onChange={onChange}
        value={tempEvent?.target?.value || ""}
      />
      <LoadingButton
        onClick={onCheckForToxicity}
        disabled={!tempEvent?.target?.value || !changed}
        variant="contained"
        loading={loading}
      >
        Check for toxicity and save
      </LoadingButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Toxicity check result</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Following is detected in your text and therefore cannot be saved
          </DialogContentText>
          {toxicities.map((t) => (
            <DialogContentText id="alert-dialog-description">
              {t}
            </DialogContentText>
          ))}
          <DialogContentText id="alert-dialog-description">
            Please change the text and help us maintain a user friendly
            environment
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};
export default ToxicityDetectedInput;

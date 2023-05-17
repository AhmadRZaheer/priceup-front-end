import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  //   boxShadow: 24,
  p: 4,
};
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} accept="image/*" />

      {selectedImage ? (
        <img
          width={"80px"}
          height={"80px"}
          src={URL.createObjectURL(selectedImage)}
          alt="Selected"
        />
      ) : (
        <label htmlFor="upload-image-input">
          <button
            style={{
              height: "100px",
              width: "100px",
              boxShadow: "0px 0px 2px blue",
            }}
            component="span"
          >
            Click to Upload an Image
          </button>
        </label>
      )}
    </div>
  );
};

export default function BasicModal({ open, close, handleHeaderClick }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const [hardwareLabel, setHardwareLabel] = useState("");

  const handleLabelChange = (event) => {
    setHardwareLabel(event.target.value);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Typography>Edit Finishes</Typography>
            <IconButton onClick={close}>
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            <ImageUploader />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Operable Transom"
            />
          </Box>
          <Box>
            <Typography>Hardware Label</Typography>
            <TextField
              placeholder="Hardware Label"
              value={hardwareLabel}
              onChange={handleLabelChange}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box>
            <Typography>Holes Needed</Typography>
            <TextField
              placeholder="Holes"
              value={hardwareLabel}
              onChange={handleLabelChange}
              variant="outlined"
            />
          </Box>
          <Box onClick={() => handleHeaderClick()}>
            <Button fullWidth variant="contained">
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

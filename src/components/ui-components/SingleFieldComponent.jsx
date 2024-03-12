import { Delete, Done, Edit } from "@mui/icons-material";
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getAdditionalFields,
  setContent,
} from "../../redux/estimateCalculations";
import { useDispatch, useSelector } from "react-redux";

export const SingleField = ({ item, index }) => {
  const dispatch = useDispatch();
  const addedFields = useSelector(getAdditionalFields);
  const [AddedValue, setAddedValue] = useState({
    label: item.label,
    cost: item.cost,
  });
  const [isEditField, setisEditField] = useState(false);

  const handleSaveField = () => {
    const updatedFields = [...addedFields];
    updatedFields[index] = {
      label: AddedValue.label,
      cost: AddedValue.cost,
    };
    dispatch(setContent({ type: "additionalFields", item: updatedFields }));
    setisEditField(true);
  };
  const handleEditField = () => {
    setisEditField(false);
  };

  const handleLabelChange = (value) => {
    setAddedValue((prevState) => ({
      ...prevState,
      label: value,
    }));
  };

  const handleCostChange = (value) => {
    setAddedValue((prevState) => ({
      ...prevState,
      cost: Number(value),
    }));
  };

  const handleDeleteField = () => {
    const updatedFields = addedFields.filter((field, i) => i !== index);
    dispatch(setContent({ type: "additionalFields", item: updatedFields }));
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: {
          sm: "2px solid #D0D5DD",
          xs: "2px solid #423f57",
        },
        paddingLeft: 3,
        paddingBottom: 1,
        color: { sm: "#000000  ", xs: "white" },
      }}
    >
      <Box
        sx={{
          width: "120px",
        }}
      >
        <Typography>Label</Typography>
        <TextField
          disabled={isEditField}
          placeholder="label"
          InputProps={{
            style: {
              color: "black",
              borderRadius: 10,
              border: "1px solid #cccccc",
              backgroundColor: "white",
            },
            inputProps: { min: 0 },
          }}
          InputLabelProps={{
            style: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          }}
          sx={{
            color: { sm: "black", xs: "white" },
            width: "100%",
          }}
          variant="outlined"
          size="small"
          value={AddedValue.label}
          onChange={(e) => handleLabelChange(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          width: "120px",
        }}
      >
        <Typography>Cost</Typography>
        <TextField
          disabled={isEditField}
          placeholder="cost"
          type="number"
          InputProps={{
            style: {
              color: "black",
              borderRadius: 10,
              border: "1px solid #cccccc",
              backgroundColor: "white",
            },
            inputProps: { min: 0 },
          }}
          InputLabelProps={{
            style: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          }}
          sx={{
            color: { sm: "black", xs: "white" },
            width: "100%",
          }}
          variant="outlined"
          size="small"
          value={AddedValue.cost}
          onChange={(e) => handleCostChange(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.2,
          mt: 2.4,
        }}
      >
        {isEditField ? (
          <Tooltip title={"Edit"} placement="top">
            <IconButton onClick={handleEditField}>
              <Edit sx={{ color: { md: "black", xs: "white" } }} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={"Save"} placement="top">
            <IconButton onClick={handleSaveField}>
              <Done sx={{ color: { md: "black", xs: "white" } }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={"Delete"} placement="top">
          <IconButton onClick={handleDeleteField}>
            <Delete sx={{ color: { md: "black", xs: "white" } }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

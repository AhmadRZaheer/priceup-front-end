import { Delete, Done, Edit } from "@mui/icons-material";
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getAdditionalFields,
  getQuoteState,
  setContent,
} from "../../redux/estimateCalculations";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { quoteState } from "../../utilities/constants";

export const SingleField = ({ item, index }) => {
  const dispatch = useDispatch();
  const updatecheck = useSelector(getQuoteState);
  const addedFields = useSelector(getAdditionalFields);
  const [AddedValue, setAddedValue] = useState({
    label: item.label,
    cost: item.cost,
  });
  const [isEditField, setisEditField] = useState(
    updatecheck === quoteState.EDIT && item.label ? true : false
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveField = () => {
    const updatedFields = [...addedFields];
    updatedFields[index] = {
      label: AddedValue.label,
      cost: AddedValue.cost,
    };

    if (
      AddedValue.label !== "" &&
      AddedValue.cost > 0 &&
      !addedFields.some(
        (field, i) => field.label === AddedValue.label && i !== index
      )
    ) {
      dispatch(setContent({ type: "additionalFields", item: updatedFields }));
      setisEditField(true);
    } else if (AddedValue.label === "") {
      enqueueSnackbar({
        message: "Please Enter the label",
        variant: "warning",
      });
    } else if (AddedValue.cost <= 0) {
      enqueueSnackbar({
        message: "Cost must be greater than 0",
        variant: "warning",
      });
    } else if (addedFields.some((field) => field.label === AddedValue.label)) {
      enqueueSnackbar({
        message: "Label already exists",
        variant: "warning",
      });
    }
  };

  const handleEditField = () => {
    setisEditField(false);
  };

  const handleLabelChange = (value) => {
    setAddedValue((prevState) => ({
      ...prevState,
      label: value.toString(),
    }));
  };

  const handleCostChange = (value) => {
    if (/^\d*$/.test(value)) {
      setAddedValue((prevState) => ({
        ...prevState,
        cost: value,
      }));
    }
  };

  const handleDeleteField = () => {
    const updatedFields = addedFields.filter((field, i) => i !== index);
    dispatch(setContent({ type: "additionalFields", item: updatedFields }));
  };

  useEffect(() => {
    setAddedValue({
      label: item.label,
      cost: item.cost,
    });
  }, [item]);

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
          type="text"
          InputProps={{
            style: {
              color: "black",
              borderRadius: 10,
              border: "1px solid #cccccc",
              backgroundColor: "white",
            },
            inputProps: { maxLength: 7 },
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

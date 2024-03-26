import {
  Box,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomInputField from "./CustomInput";
import { Done, Edit } from "@mui/icons-material";
import { useState } from "react";

export const SingleFieldEdit = ({
  label,
  error,
  helperText,
  onBlur,
  onChange,
  value,
  name,
  placeholder,
}) => {
  const [isEdit, setisEdit] = useState(true);
  const handleEdit = () => {
    if (isEdit) {
      setisEdit(false);
    } else {
      setisEdit(true);
    }
  };
  return (
    <>
      <Box>
        <Typography>{label}</Typography>
        <CustomInputField
          size="small"
          placeholder={placeholder}
          name={name}
          type="text"
          InputProps={{
            inputProps: { min: 0, maxLength: 7 },
            endAdornment: (
              <InputAdornment
                onClick={handleEdit}
                position="end"
                style={{ cursor: "pointer", borderLeft: "1px solid" }}
              >
                {isEdit ? (
                  <Tooltip title="Edit">
                    <Edit fontSize="20px" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Done">
                    <Done fontSize="20px" />
                  </Tooltip>
                )}
              </InputAdornment>
            ),
          }}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          variant="outlined"
          fullWidth
          disabled={isEdit}
        />
      </Box>
    </>
  );
};

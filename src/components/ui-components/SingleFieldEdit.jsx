import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomInputField from "./CustomInput";
import { Done, Edit, EditOutlined } from "@mui/icons-material";
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
      <Grid item xs={6} sx={{ width: "100%", }} className='model-field'>
        <Typography className="accordian-label-text">{label}</Typography>
        <CustomInputField
          size="small"
          placeholder={placeholder}
          name={name}
          type="text"
          className="custom-textfield"
          inputProps={{
            min: 0,
            maxLength: 7,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={isEdit ? "Edit" : "Done"}>
                  {isEdit ? (
                    <EditOutlined
                      fontSize="small"
                      onClick={handleEdit}
                      sx={{ cursor: "pointer", width: '20px', height: '20px' }}
                    />
                  ) : (
                    <Done
                      fontSize="small"
                      onClick={handleEdit}
                      sx={{ cursor: "pointer", width: '20px', height: '20px' }}
                    />
                  )}
                </Tooltip>
              </InputAdornment>
            )
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
      </Grid>
    </>
  );
};

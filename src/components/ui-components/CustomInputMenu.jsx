import "./input.scss";
import { MenuItem, TextField } from "@mui/material";

function CustomInputMenu({
  type,
  name,
  value,
  placeholder,
  onChange,
  fullWidth,
  size,
  InputProps,
  error,
  helperText,
  onBlur,
  MenuData,
  color,
}) {
  return (
    <>
      <TextField
        select
        fullWidth={fullWidth}
        variant="outlined"
        size={size || "small"}
        type={type}
        name={name}
        value={value}
        error={error}
        InputProps={InputProps}
        placeholder={placeholder}
        onChange={onChange}
        helperText={helperText}
        onBlur={onBlur}
        className={
          error
            ? "custom-textfield-error"
            : color === "purple"
            ? "custom-textfield-purple"
            : "custom-textfield"
        }
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "40px",
          },
        }}
      >
        <MenuItem value={null}>Select Empty</MenuItem>
        {MenuData?.map((option) => (
          <MenuItem key={option.name} value={option?._id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}

export default CustomInputMenu;

import { TextField } from "@material-ui/core";
import "./input.scss";

function CustomInputField({
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
}) {
  return (
    <>
      <TextField
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
        className={error ? "custom-textfield-error": "custom-textfield"}
      />
    </>
  );
}

export default CustomInputField;

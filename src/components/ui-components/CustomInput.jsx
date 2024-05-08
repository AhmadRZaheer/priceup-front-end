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
  inputProps,
  InputProps,
  error,
  helperText,
  onBlur,
  disabled,
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
        disabled={disabled}
        error={error}
        inputProps={{...inputProps}}
        InputProps={InputProps}
        placeholder={placeholder}
        onChange={onChange}
        helperText={helperText}
        onBlur={onBlur}
        className={
          error ? "custom-textfield-error" : disabled ? "" : "custom-textfield"
        }
      />
    </>
  );
}

export default CustomInputField;

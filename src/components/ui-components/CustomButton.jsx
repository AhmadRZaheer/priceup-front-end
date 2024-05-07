import { IconButton } from "@mui/material";
import { severity as typeSeverity } from "../../utilities/constants";

function CustomIconButton({
  handleClick,
  disable,
  buttonText = "Edit",
  icon,
  severity,
}) {
  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={disable}
        sx={{
          backgroundColor: severity === typeSeverity.ERROR ? "red" : "#8477DA",
          color: "white",
          "&:hover": {
            backgroundColor:
              severity === typeSeverity.ERROR ? "red" : "#8477DA",
          },
          borderRadius: 1,
          padding: 1,
          textTransform: "capitalize",
          fontSize: 16,
          height: 35,
          zIndex: 3,
        }}
      >
        {icon}

        {buttonText}
      </IconButton>
    </>
  );
}
export default CustomIconButton;

import { IconButton } from "@mui/material";
import PlusWhiteIcon from "../../Assets/plus-white.svg";
import { Edit } from "@mui/icons-material";

function CustomIconButton({ handleClick, disable, buttonText = "Edit", icon, }) {
  console.log(disable, "????");
  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={disable}
        sx={{
          backgroundColor: "#8477DA",
          color: "white",
          "&:hover": { backgroundColor: "#8477DA" },
          borderRadius: 1,
          padding: 1,
          textTransform: "capitalize",
          fontSize: 16,
          height: 35,
        }}
      >
        {icon}

        {buttonText}
      </IconButton>
    </>
  );
}
export default CustomIconButton;

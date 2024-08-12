import { Box, Typography } from "@mui/material";
import BlueBg from "../../Assets/widgets/Rectangle-blue.png";
import GreenBg from "../../Assets/widgets/Rectangle-green.png";
import RedBg from "../../Assets/widgets/Rectangle-red.png";
import Purple from "../../Assets/widgets/Rectangle-purple.png";
function WidgetCard({ varient = "blue", title, text }) {
  const imageByVarient =
    varient === "blue"
      ? BlueBg
      : varient === "green"
      ? GreenBg
      : varient === "red"
      ? RedBg
      : varient === "purple"
      ? Purple
      : BlueBg;
  return (
    <>
      <Box
        sx={{
          height: "121px",
          backgroundImage: `url(${imageByVarient})`,
          backgroundRepeat: "no-repeat",
          color: "white",
          padding: "20px",
          backgroundSize: "contain",
          width: "336.9px",
          overflow: "hidden", // Ensures no content spills out of the box
          boxSizing: "border-box",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
          {title ?? "name"}
        </Typography>
        <Typography sx={{ fontSize: "40px", fontWeight: 500 }}>
          {text ?? "00"}
        </Typography>
      </Box>
    </>
  );
}

export default WidgetCard;

import { Box, Typography } from "@mui/material";
import BlueBg from "../../Assets/widgets/Rectangle-blue.png";
import GreenBg from "../../Assets/widgets/Rectangle-green.png";
import RedBg from "../../Assets/widgets/Rectangle-red.png";
import Purple from "../../Assets/widgets/Rectangle-purple.png";
import LargeRed from "../../Assets/widgets/LargeRed.png";
import LargeGreen from "../../Assets/widgets/LargeGreen.png";
import LargeBlue from "../../Assets/widgets/LargeBlue.png";
function WidgetCard({
  type = 1,
  varient = "blue",
  title,
  text,
  width = "336.9px",
}) {
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
  const largeImageByVarient =
    varient === "blue"
      ? LargeBlue
      : varient === "green"
      ? LargeGreen
      : varient === "red"
      ? LargeRed
      : BlueBg;
  return (
    <>
      <Box
        sx={{
          height: "121px",
          backgroundImage: `url(${
            type === 1 ? imageByVarient : largeImageByVarient
          })`,
          backgroundRepeat: "no-repeat",
          color: "white",
          padding: "20px",
          backgroundSize: "cover",
          // width: type === 1 ? "336.9px" : "450.54px",
          overflow: "hidden", // Ensures no content spills out of the box
          boxSizing: "border-box",
          // backgroundColor: "yellow",
          borderRadius: "8px"
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

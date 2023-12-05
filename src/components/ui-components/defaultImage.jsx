import { Typography } from "@mui/material";
import { backendURL } from "../../utilities/common";

function DefaultImage({ image, name }) {
  let firstNameInitial = "";
  let lastNameInitial = "";

  if (name) {
    firstNameInitial = name.charAt(0);
    lastNameInitial = name.length > 1 ? name.charAt(1) : "";
  }

  switch (image) {
    case "images/users/default.jpg":
      return (
        <Typography
          sx={{
            backgroundColor: "#F9F5FF",
            width: 40,
            height: 40,
            borderRadius: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7F56D9",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {firstNameInitial}
          {lastNameInitial}
        </Typography>
      );
    case "images/staff/default.jpg":
      return (
        <Typography
          sx={{
            backgroundColor: "#F9F5FF",
            width: 40,
            height: 40,
            borderRadius: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7F56D9",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {firstNameInitial}
          {lastNameInitial}
        </Typography>
      );
    case "":
      return (
        <Typography
          sx={{
            backgroundColor: "#F9F5FF",
            width: 40,
            height: 40,
            borderRadius: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7F56D9",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {firstNameInitial}
          {lastNameInitial}
        </Typography>
      );
    case "null":
      return (
        <Typography
          sx={{
            backgroundColor: "#F9F5FF",
            width: 40,
            height: 40,
            borderRadius: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7F56D9",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {firstNameInitial}
          {lastNameInitial}
        </Typography>
      );
    case null:
      return (
        <Typography
          sx={{
            backgroundColor: "#F9F5FF",
            width: 40,
            height: 40,
            borderRadius: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7F56D9",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {firstNameInitial}
          {lastNameInitial}
        </Typography>
      );
    case undefined:
      return (
        <Typography
          sx={{
            backgroundColor: "#F9F5FF",
            width: 40,
            height: 40,
            borderRadius: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7F56D9",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {firstNameInitial}
          {lastNameInitial}
        </Typography>
      );
    default:
      return (
        <img
          className="cellImg"
          style={{ width: 40, height: 40 }}
          src={`${backendURL}/${image}`}
          alt="logo image"
        />
        //   ) : (
        //     <Typography
        //       sx={{
        //         backgroundColor: "#F9F5FF",
        //         width: 40,
        //         height: 40,
        //         borderRadius: "100%",
        //         textAlign: "center",
        //         display: "flex",
        //         alignItems: "center",
        //         justifyContent: "center",
        //         color: "#7F56D9",
        //         textTransform: "uppercase",
        //         fontWeight: "bold",
        //       }}
        //     >
        //       {firstNameInitial}
        //       {lastNameInitial}
        //     </Typography>
      );
  }
}

export default DefaultImage;

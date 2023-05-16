import { palette } from "../palette";

export const MuiButton = {
  styleOverrides: {
    root: {
      color: "#fff",
      background: "black",
      border: "none",
    },
    text: {
      // padding: 0,
      background: "transparent",
      boxShadow: "none",
      color: "black",
      "&:hover": {
        background: "transparent",
        boxShadow: "none",
        color: "black",
        border: "none",
      },
    },

    newButton: {
      alignItems: "center",
      maxWidth: "220px",
      height: "50px",
      background: palette.primary.lightBlack,
      boxShadow: "inset rgba(0, 0, 0, 0.25) 0px -1px 0px",
      borderRadius: "0px",
      textTransform: "initial",
      "&:hover": {
        background: palette.primary.fire,
      },
    },
  },
};

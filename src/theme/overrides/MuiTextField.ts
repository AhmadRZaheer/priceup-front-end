import { palette } from "../palette";
export const MuiTextField = {
  styleOverrides: {
    root: {
      "& label.Mui-focused": {
        // color: 'rgba(243, 82, 63, 1)'
        border: "none",
      },

      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          // borderColor: 'rgba(243, 82, 63, 1)'
          border: "none",
        },
        "&:hover fieldset": {
          // borderColor: 'rgba(243, 82, 63, 1)'
          border: "none",
        },
        "&.Mui-focused fieldset": {
          // borderColor: 'rgba(243, 82, 63, 1)',
          border: "none",
          outline: "none",
        },
        color: palette.text.darkBlack,
        fontSize: "22px",
        fontFamily: "Inter",
        fontWeight: 700,
      },
    },
  },
};

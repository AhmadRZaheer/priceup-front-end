import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
  name: "snackbar",
  initialState: {
    snackbar: {
      open: false,
      message: "",
      severity: "",
    },
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    },
    closeSnackbar: (state) => {
      state.snackbar = {
        ...state.snackbar,
        open: false,
      };
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackBarSlice.actions;

export const selectSnackbar = (state) => state.snackbar.snackbar;

export default snackBarSlice.reducer;

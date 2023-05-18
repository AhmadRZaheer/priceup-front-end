import { configureStore, createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    entries: [
      {
        additionalFinishType: "",
        hardwarePartNumber: "",
        cost: "",
        price: "",
        isChecked: false,
        thickness: "",
      },
    ],
  },
  reducers: {
    addFormEntry: (state, action) => {
      state.entries.push(action.payload);
    },
  },
});

export const { addFormEntry } = formSlice.actions;
export default formSlice.reducer;

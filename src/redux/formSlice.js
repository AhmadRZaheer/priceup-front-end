import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    entries: [
      {
        id: Date.now() % 10000,
        img: "",
        title: "",
        additionalFinishType: "",
        hardwarePartNumber: "",
        cost: "",
        price: "",
        isChecked: false,
        thickness: "",
        items: [],
        toggle: true,
      },
    ],
  },
  reducers: {
    addFormEntry: (state, action) => {
      state.entries.push(action.payload);
    },

    addItems: (state, action) => {
      const { id, data } = action.payload;

      const entry = state.entries.find((entry) => entry.id === id);

      if (entry) {
        entry.items.push(data);
      }
    },
  },
});

export const { addFormEntry, addItems} = formSlice.actions;
export default formSlice.reducer;

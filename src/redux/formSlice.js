import { configureStore, createSlice } from "@reduxjs/toolkit";

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
    // addItems: (state, action) => {
    //   const { id, data } = action.payload;
    //   state.entries[index].items.push(data);
    // },

    addItems: (state, action) => {
      const { id, data } = action.payload;
      console.log(id, "id for new item to be pushed");

      const entry = state.entries.find((entry) => entry.id === id);

      if (entry) {
        entry.items.push(data);
      }
    },

    // deleteItem: (state, action) => {
    //   const id = action.payload;
    //   console.log(id, "id deleted ");

    //   // return state.entries[0].items.filter((hardware) => hardware.id !== id);

    //   state.entries[0].items = state.entries[0].items.filter(
    //     (hardware) => hardware.id !== id
    //   );
    // },

    handleToggle: (state, action) => {
      console.log(action, "checing for toogle id ");
    },
  },
});

export const { addFormEntry, addItems, handleToggle } = formSlice.actions;
export default formSlice.reducer;

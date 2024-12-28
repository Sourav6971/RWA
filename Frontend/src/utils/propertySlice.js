import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "property",
  initialState: null,
  reducers: {
    addProperty: (state, action) => {
      return action.payload;
    },
    removeProperty: (state, action) => {
      return null;
    },
  },
});

export const { addProperty, removeProperty } = propertySlice.actions;
export default propertySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const assetSlice = createSlice({
  name: "asset",
  initialState: null,
  reducers: {
    addAsset: (state, action) => {
      return action.payload;
    },
    removeAsset: (state, action) => {
      return null;
    },
  },
});

export const { addAsset, removeAsset } = assetSlice.actions;
export default assetSlice.reducer;

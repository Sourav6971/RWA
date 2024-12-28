import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import propertyReducer from "./propertySlice";
import assetReducer from "./assetSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
    asset: assetReducer,
  },
});

export default appStore;

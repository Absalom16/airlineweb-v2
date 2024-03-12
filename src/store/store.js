import { configureStore } from "@reduxjs/toolkit";
import aircraftsReducer from "./aircraftsSlice";

const store = configureStore({
  reducer: {
    aircrafts: aircraftsReducer,
  },
});

export default store;

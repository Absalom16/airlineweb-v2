import { configureStore } from "@reduxjs/toolkit";
import aircraftsReducer from "./aircraftsSlice";
import userReducer from "./userSlice";
import userFlightsReducer from "./userFlightsSlice";

const store = configureStore({
  reducer: {
    aircrafts: aircraftsReducer,
    user: userReducer,
    userFlights: userFlightsReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import aircraftsReducer from "./aircraftsSlice";
import userReducer from "./userSlice";
import userFlightsReducer from "./userFlightsSlice";
import availableFlightsReducer from "./availableFlightsSlice";
import citiesReducer from "./citiesSlice";

const store = configureStore({
  reducer: {
    aircrafts: aircraftsReducer,
    user: userReducer,
    userFlights: userFlightsReducer,
    availableFlights: availableFlightsReducer,
    cities: citiesReducer,
  },
});

export default store;

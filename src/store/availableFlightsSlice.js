import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  allFlights: [],
};

const availableFlightsSlice = createSlice({
  name: "availableFlights",
  initialState: initialState,
  reducers: {
    setAvailableFlights(state, action) {
      state.flights = action.payload;
    },
    setAllFlights(state, action) {
      state.allFlights = action.payload;
    },
  },
});

export const { setAvailableFlights, setAllFlights } =
  availableFlightsSlice.actions;
export default availableFlightsSlice.reducer;

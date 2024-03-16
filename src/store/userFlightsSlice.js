import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userFlights: [],
};

const userFlightsSlice = createSlice({
  name: "userFlights",
  initialState: initialState,
  reducers: {
    setUserFlights(state, action) {
      state.userFlights = action.payload;
    },
  },
});

export const { setUserFlights } = userFlightsSlice.actions;

export default userFlightsSlice.reducer;


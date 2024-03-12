import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aircrafts: [],
};

const aircraftsSlice = createSlice({
  name: "aircrafts",
  initialState: initialState,
  reducers: {
    setAircrafts(state, action) {
      state.aircrafts = action.payload;
    },
  },
});

export const { setAircrafts } = aircraftsSlice.actions;

export default aircraftsSlice.reducer;

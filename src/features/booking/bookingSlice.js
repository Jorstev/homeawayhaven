import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeFilter: null };

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setActiveFilter: (state, action) => {
      if (state.activeFilter !== action.payload) {
        state.activeFilter = action.payload;
      } else {
        state.activeFilter = null;
      }
    },
  },
});

export const { setActiveFilter } = bookingSlice.actions;
export default bookingSlice.reducer;

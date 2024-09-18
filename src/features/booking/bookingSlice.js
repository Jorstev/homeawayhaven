import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeFilter: null, formData: null };

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
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setActiveFilter, setFormData } = bookingSlice.actions;
export default bookingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilter: null,
  formData: null,
  adminValidation: false,
};

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
    setAdminValidation: (state, action) => {
      state.adminValidation = action.payload;
    },
  },
});

export const { setActiveFilter, setFormData, setAdminValidation } =
  bookingSlice.actions;
export default bookingSlice.reducer;

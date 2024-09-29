import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilter: null,
  formData: null,
  adminValidation: false,
  amenities: [],
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
    setAmenities: (state, action) => {
      let isInAmenity = state.amenities.find(
        (amenity) => amenity === action.payload
      );
      if (isInAmenity) {
        state.amenities = state.amenities.filter(
          (amenity) => amenity !== action.payload
        );
      } else {
        state.amenities.push(action.payload);
      }
    },
  },
});

export const {
  setActiveFilter,
  setFormData,
  setAdminValidation,
  setAmenities,
} = bookingSlice.actions;
export default bookingSlice.reducer;

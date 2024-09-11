import { configureStore } from "@reduxjs/toolkit";
import bookingSlice from "./features/booking/bookingSlice";

export const store = configureStore({
  reducer: { booking: bookingSlice },
});

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Bookmark from "./pages/Bookmark";
import Promotion from "./pages/Promotion";
import Luxury from "./pages/Luxury";
import Administration from "./pages/Administration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BookingDetails from "./pages/BookingDetails";
import BookingPayment from "./features/booking/BookingPayment";
import ReservationConfirmation from "./features/booking/ReservationConfirmation";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import EditBooking from "./features/administration/EditBooking";
import AddBooking from "./features/administration/AddBooking";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to={"/booking"} />} />

            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:booking_id" element={<BookingDetails />} />
            <Route
              path="/booking/:booking_id/payment"
              element={<BookingPayment />}
            />
            <Route
              path="/booking/:booking_id/payment/confirmation"
              element={<ReservationConfirmation />}
            />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/luxury" element={<Luxury />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/console" element={<Administration />} />
            <Route
              path="/login/console/:booking_id/edit"
              element={<EditBooking />}
            />
            <Route path="/login/console/add" element={<AddBooking />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}

export default App;

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
            <Route index element={<Navigate to={"/booking"} />}></Route>

            <Route path="/booking" element={<Booking />}></Route>
            <Route
              path="/booking/:booking_id"
              element={<BookingDetails />}
            ></Route>
            <Route
              path="/booking/:booking_id/payment"
              element={<BookingPayment />}
            ></Route>
            <Route
              path="/booking/:booking_id/payment/confirmation"
              element={<ReservationConfirmation />}
            ></Route>
            <Route path="/promotion" element={<Promotion />}></Route>
            <Route path="/luxury" element={<Luxury />}></Route>
            <Route path="/bookmark" element={<Bookmark />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/login/console" element={<Administration />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}

export default App;

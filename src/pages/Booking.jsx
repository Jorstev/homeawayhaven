import { useQuery } from "@tanstack/react-query";
import BookingFilter from "../features/booking/BookingFilter";
import BookingItem from "../features/booking/BookingItem";
import { getAllBooking } from "../services/apiBookings";
import { useState } from "react";

function Booking() {
  const [activeFilter, setActiveFilter] = useState(null);

  const {
    isPending,
    isError,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBooking,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="max-w-3xl 2xl:max-w-5xl  min-w-[370px] mx-auto">
      <BookingFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <h1 className="py-7 pl-3 sm:pl-20 md:pl-10 text-2xl font-semibold">
        Booking
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-10">
        {bookings
          .filter((booking) =>
            activeFilter
              ? booking.classification === activeFilter &&
                booking.discount === 0
              : booking.discount === 0
          )
          .map((booking) => (
            <BookingItem booking={booking} key={booking.booking_id} />
          ))}
      </div>
    </div>
  );
}

export default Booking;

import BookingFilter from "../features/booking/BookingFilter";
import BookingItem from "../features/booking/BookingItem";
import BookingItemLuxury from "../features/booking/BookingItemLuxury";

import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

function Luxury() {
  const activeFilter = useSelector((state) => state.booking.activeFilter);

  const { bookings, isError, error } = useOutletContext();

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="max-w-3xl 2xl:max-w-5xl  min-w-[370px] mx-auto">
      <BookingFilter />
      <h1 className="py-7 pl-3 sm:pl-20 md:pl-10 text-2xl font-semibold">
        Booking Luxury
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 place-items-center gap-y-10">
        {bookings
          ?.filter((booking) =>
            activeFilter
              ? booking.classification === activeFilter &&
                booking.discount === 0 &&
                booking.luxury === true
              : booking.discount === 0 && booking.luxury === true
          )
          .map((booking) => (
            <BookingItemLuxury booking={booking} key={booking.booking_id} />
          ))}
      </div>
    </div>
  );
}

export default Luxury;

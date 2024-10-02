import { useEffect, useState } from "react";
import BookingFilter from "../features/booking/BookingFilter";
import BookingItem from "../features/booking/BookingItem";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePaginationCalc } from "../hooks/usePaginationCalc";

function Booking() {
  const activeFilter = useSelector((state) => state.booking.activeFilter);
  const { bookings, isError, error } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const { totalPages, filteredBookings, bookingType } = usePaginationCalc(
    currentPage,
    bookings
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="max-w-3xl 2xl:max-w-5xl min-w-[370px] mx-auto">
      <BookingFilter />
      <h1 className="py-7 pl-3 sm:pl-20 md:pl-10 text-2xl font-semibold">
        Booking
      </h1>
      <div
        className={`grid place-items-center gap-y-10 ${
          bookingType === "luxury"
            ? "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3"
            : "grid-cols-2 md:grid-cols-3 2xl:grid-cols-4"
        }`}
      >
        {filteredBookings?.map((booking) => (
          <BookingItem booking={booking} key={booking.booking_id} />
        ))}
      </div>

      <div className="flex justify-center my-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Booking;

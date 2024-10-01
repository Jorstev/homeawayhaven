import { useState } from "react";
import BookingFilter from "../features/booking/BookingFilter";
import BookingItem from "../features/booking/BookingItem";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

function Luxury() {
  const activeFilter = useSelector((state) => state.booking.activeFilter);

  const { bookings, isError, error } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(
    bookings?.filter((booking) =>
      activeFilter
        ? booking.classification === activeFilter &&
          (booking.discount === 0 || booking.discount === null) &&
          booking.luxury === true
        : (booking.discount === 0 || booking.discount === null) &&
          booking.luxury === true
    ).length / itemsPerPage
  );

  const filteredBookings = bookings
    ?.filter((booking) =>
      activeFilter
        ? booking.classification === activeFilter &&
          (booking.discount === 0 || booking.discount === null) &&
          booking.luxury === true
        : (booking.discount === 0 || booking.discount === null) &&
          booking.luxury === true
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="max-w-3xl 2xl:max-w-5xl min-w-[370px] mx-auto">
      <BookingFilter />
      <h1 className="py-7 pl-3 sm:pl-20 md:pl-10 text-2xl font-semibold">
        Booking
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 place-items-center gap-y-10">
        {filteredBookings?.map((booking) => (
          <BookingItem booking={booking} key={booking.booking_id} />
        ))}
      </div>

      <div className="flex justify-center mt-6">
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

export default Luxury;

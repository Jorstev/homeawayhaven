import { AiFillPlusCircle } from "react-icons/ai";
import BookingItem from "../features/booking/BookingItem";

import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";

function Administration() {
  const { bookings, isError, error } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Adjust the number of items per page

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const filteredBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="max-w-3xl 2xl:max-w-5xl  min-w-[370px] mx-auto">
      <div className="pb-10 pl-3 sm:pl-20 md:pl-10">
        <h1 className="py-7 text-2xl font-semibold">Administration Console</h1>
        <span className=" text-justify">
          In this administrative module, you can edit, delete, and add content
          to keep the website accurate and up-to-date.
        </span>
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
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-10">
        <Link
          to={"/login/console/add"}
          className="relative h-64 w-44 md:h-64 md:w-52 flex justify-center items-center shadow-md border border-gray-100 cursor-pointer z-0"
        >
          <AiFillPlusCircle className="text-4xl" color="#0FA958" />
        </Link>
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

export default Administration;

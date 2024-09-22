import { AiFillPlusCircle } from "react-icons/ai";
import BookingItem from "../features/booking/BookingItem";

import { useOutletContext } from "react-router-dom";

function Administration() {
  const { bookings, isError, error } = useOutletContext();

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
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-10">
        <div className="relative h-64 w-48 md:h-64 md:w-52 flex justify-center items-center shadow-md border border-gray-100 cursor-pointer z-0">
          <AiFillPlusCircle className="text-4xl" color="#0FA958" />
        </div>
        {bookings.map((booking) => (
          <BookingItem booking={booking} key={booking.booking_id} />
        ))}
      </div>
    </div>
  );
}

export default Administration;

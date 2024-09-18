import { useEffect, useState } from "react";
import BookingItem from "../features/booking/BookingItem";

function Bookmark() {
  const [bookmarkBookings, setBookmarkBookings] = useState([]);
  // let bookmarkBookings = [];
  useEffect(() => {
    const fetchedBookings = [];

    for (const key in localStorage) {
      if (
        localStorage.getItem(key) !== false &&
        localStorage.getItem(key) !== null &&
        key !== "TanstackQueryDevtools.open"
      ) {
        const booking = JSON.parse(localStorage.getItem(key));
        fetchedBookings.push(booking);
      }
    }

    setBookmarkBookings(fetchedBookings); // Set all bookings at once after loop
  }, []);

  return (
    <div className="max-w-3xl 2xl:max-w-5xl  min-w-[370px] mx-auto">
      <h1 className="py-7 pl-3 sm:pl-20 md:pl-10 text-2xl font-semibold">
        Bookmark
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-10">
        {bookmarkBookings.map((booking) => (
          <BookingItem booking={booking} key={booking.booking_id} />
        ))}
      </div>
    </div>
  );
}

export default Bookmark;

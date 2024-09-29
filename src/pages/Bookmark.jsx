import { useContext, useEffect, useState } from "react";
import BookingItem from "../features/booking/BookingItem";
import EmptyBookmark from "../ui/EmptyBookmark";
import { useOutletContext } from "react-router-dom";

function Bookmark() {
  const { bookmarkBookings, updateBookmarks } = useOutletContext();
  useEffect(() => {
    // Initially fetch bookmarks on load (though this will also happen in AppLayout)
    updateBookmarks();
  }, []);

  return (
    <div className="max-w-3xl 2xl:max-w-5xl  min-w-[370px] mx-auto">
      <h1 className="py-7 pl-3 sm:pl-20 md:pl-10 text-2xl font-semibold">
        Bookmark
      </h1>
      {bookmarkBookings.length !== 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-10">
          {bookmarkBookings.map((booking) => (
            <BookingItem
              booking={booking}
              key={booking.booking_id}
              updateBookmarks={updateBookmarks}
            />
          ))}
        </div>
      ) : (
        <EmptyBookmark />
      )}
    </div>
  );
}

export default Bookmark;

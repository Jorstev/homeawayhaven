import { useContext, useEffect, useState } from "react";
import BookingItem from "../features/booking/BookingItem";
import EmptyBookmark from "../ui/EmptyBookmark";
import { useOutletContext } from "react-router-dom";

function Bookmark() {
  const { bookmarkBookings, updateBookmarks } = useOutletContext();

  useEffect(() => {
    // Initially fetch bookmarks on load (though this will also happen in AppLayout)
    updateBookmarks();
  }, [updateBookmarks]);

  return (
    <div className="min-w-[370px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_46%,_#ffffff_100%)] px-3 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_60px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
            Saved collection
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Bookmarks
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            Keep your favorite stays in one place and compare them in a calmer, roomier layout.
          </p>
        </section>

        <div className="mt-8">
      {bookmarkBookings.length !== 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 place-items-stretch">
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
      </div>
    </div>
  );
}

export default Bookmark;

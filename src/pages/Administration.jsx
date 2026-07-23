import { AiFillPlusCircle } from "react-icons/ai";
import BookingItem from "../features/booking/BookingItem";

import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";

function Administration() {
  const { bookings, isError, error } = useOutletContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const filteredBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const luxuryCount = bookings.filter((booking) => booking.luxury).length;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="min-w-[370px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_46%,_#ffffff_100%)] px-3 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_24px_60px_rgba(148,163,184,0.18)] backdrop-blur-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
                Console Overview
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Administration Console
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                Review the current inventory, edit listings, and add new stays from a roomier administrative workspace.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-slate-900 px-5 py-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/85">
                  Total stays
                </p>
                <p className="mt-3 text-3xl font-semibold">{bookings.length}</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-5 py-5 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
                  Luxury
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{luxuryCount}</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-5 py-5 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
                  Page
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{currentPage}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="my-8 flex flex-wrap justify-center gap-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors duration-200 ${
              currentPage === i + 1
                ? "border-slate-900 bg-slate-900 text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)]"
                : "border-slate-200 bg-white/85 text-slate-700 hover:border-cyan-300 hover:text-cyan-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        </div>

        <div className="grid grid-cols-1 gap-8 place-items-stretch sm:grid-cols-2 xl:grid-cols-3">
        <Link
          to={"/login/console/add"}
          className="relative flex min-h-[22rem] w-full items-center justify-center overflow-hidden rounded-[1.75rem] border border-dashed border-cyan-300 bg-[linear-gradient(180deg,_rgba(236,254,255,0.9),_rgba(255,255,255,0.95))] shadow-[0_20px_50px_rgba(148,163,184,0.14)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_28px_60px_rgba(56,189,248,0.16)]"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-white shadow-[0_16px_30px_rgba(15,23,42,0.18)]">
              <AiFillPlusCircle className="text-4xl" color="#67e8f9" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
                Create listing
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Add a new stay
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-7 text-slate-600">
                Open the editor and publish a new property into the collection.
              </p>
            </div>
          </div>
        </Link>
        {filteredBookings?.map((booking) => (
          <BookingItem booking={booking} key={booking.booking_id} />
        ))}
        </div>

        <div className="my-8 flex flex-wrap justify-center gap-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-colors duration-200 ${
              currentPage === i + 1
                ? "border-slate-900 bg-slate-900 text-white shadow-[0_14px_28px_rgba(15,23,42,0.18)]"
                : "border-slate-200 bg-white/85 text-slate-700 hover:border-cyan-300 hover:text-cyan-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Administration;

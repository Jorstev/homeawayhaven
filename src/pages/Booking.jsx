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
  const sectionTitle = bookingType === "luxury" ? "Luxury escapes" : "Curated stays";

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="min-w-[370px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_48%,_#ffffff_100%)] px-3 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 shadow-[0_24px_60px_rgba(148,163,184,0.18)] backdrop-blur-sm">
          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
                HomeAwayHaven Selection
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                {sectionTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                Explore a polished collection of hotels, cabins, and houses with distinctive atmospheres, clear pricing, and quick access to details.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-slate-900 px-5 py-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/85">
                  Visible stays
                </p>
                <p className="mt-3 text-3xl font-semibold">{filteredBookings?.length || 0}</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-5 py-5 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
                  Category
                </p>
                <p className="mt-3 text-2xl font-semibold capitalize text-slate-900">
                  {activeFilter || "all"}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 px-5 py-5 shadow-inner shadow-slate-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
                  Pages
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{totalPages}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <BookingFilter />
        </div>

        <section className="mt-8">
          <div className="flex flex-col gap-3 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
                Browse stays
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                Sophisticated stays for every kind of trip
              </h2>
            </div>
            <div className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          <div
            className={`grid gap-6 ${
              bookingType === "luxury"
                ? "grid-cols-1 xl:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            }`}
          >
            {filteredBookings?.map((booking) => (
              <BookingItem booking={booking} key={booking.booking_id} />
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
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

export default Booking;

import { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeartBookmark from "../../ui/HeartBookmark";
import toast from "react-hot-toast";
import EditButton from "../../ui/EditButton";
import DeleteButton from "../../ui/DeleteButton";
import {
  deleteBookingById,
  updateBookingById,
} from "../../services/apiBookings";
import { useMutationCustom } from "../../hooks/useMutation";

function BookingItem({ booking, updateBookmarks }) {
  const {
    booking_id,
    title,
    country,
    price,
    discount,
    luxury,
    classification,
    image,
  } = booking;
  const navigate = useNavigate();
  const currentURL = useLocation();
  const [bookmarkState, setBookmarkState] = useState(false);
  const isConsole = currentURL.pathname === "/login/console";
  const isLuxuryCard = luxury && !isConsole;

  useEffect(() => {
    const isBookmarked = localStorage.getItem(booking_id) !== null;
    setBookmarkState(isBookmarked);
  }, [booking_id]);

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    isSuccess: isSuccessDelete,
    mutate: mutateDelete,
  } = useMutationCustom(
    deleteBookingById,
    "bookings",
    "Booking Successfully Removed!",
    "An error has occured!"
  );

  const {
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    isSuccess: isSuccessEdit,
    mutate: mutateEdit,
  } = useMutationCustom(
    updateBookingById,
    "bookings",
    "Booking Successfully Updated!",
    "An error has occured!"
  );

  const handlediscountPrice = (discount) => {
    if (discount === 0) {
      return null;
    } else {
      return (price - (discount / 100) * price).toFixed(2);
    }
  };
  const finalPrice = discount ? handlediscountPrice(discount) : price;

  const handleDeleteBooking = (e) => {
    e.preventDefault();
    mutateDelete(booking_id);
  };

  const handleEditBooking = (e) => {
    e.preventDefault();
    navigate(`/login/console/${booking_id}/edit`);
  };

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    const data = {
      booking_id,
      title,
      country,
      price,
      discount,
      classification,
      image,
    };

    if (bookmarkState) {
      localStorage.removeItem(booking_id);
      toast.success("Successfully Removed!");
    } else {
      localStorage.setItem(booking_id, JSON.stringify(data));
      toast.success("Bookmarked Successfully!");
    }

    setBookmarkState(!bookmarkState);
    updateBookmarks();
  };

  return (
    <Link
      to={`/booking/${booking_id}`}
      className={`group relative flex cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/88 shadow-[0_20px_50px_rgba(148,163,184,0.18)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)] ${
        isLuxuryCard
          ? "min-h-[17rem] w-full flex-col md:flex-row"
          : "min-h-[22rem] w-full flex-col"
      } ${luxury && isConsole ? "border-r-[10px] border-r-amber-300" : ""}`}
    >
      <div
        className={`relative overflow-hidden ${
          isLuxuryCard ? "h-60 w-full md:h-auto md:w-[52%]" : "h-52 w-full"
        }`}
      >
        <img
          className="h-full w-full bg-slate-200 object-cover transition duration-500 group-hover:scale-105"
          src={image}
          alt="book-image"
          role="presentation"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.62))]"></div>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm ${
              luxury
                ? "border-amber-200/70 bg-amber-200/80 text-amber-950"
                : "border-white/30 bg-white/15 text-white"
            }`}
          >
            {classification}
          </span>
          <div className="flex items-center gap-3">
            {isConsole ? (
              <>
                <EditButton
                  position={"static"}
                  onClick={handleEditBooking}
                />
                <DeleteButton
                  position={"static"}
                  onClick={handleDeleteBooking}
                />
              </>
            ) : (
              <HeartBookmark
                position={"static"}
                bookmarkState={bookmarkState}
                onClick={handleBookmarkClick}
              />
            )}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="flex items-center gap-2 text-sm text-slate-100/90">
            <IoLocationSharp className="text-cyan-300" />
            <span className="truncate">{country}</span>
          </div>
          <h3 className="mt-2 text-2xl font-semibold leading-tight">{title}</h3>
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col justify-between p-5 ${
          isLuxuryCard ? "md:w-[48%]" : ""
        }`}
      >
        <div className="space-y-4">
          {isLuxuryCard ? (
            <p className="text-sm leading-7 text-slate-600">
              Refined comfort, standout character, and quick access to the full stay profile.
            </p>
          ) : (
            <p className="text-sm leading-7 text-slate-600">
              A polished stay with dependable comfort and straightforward booking details.
            </p>
          )}

          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-inner shadow-slate-100">
            <span>Stay type</span>
            <span className="font-semibold capitalize text-slate-900">
              {classification}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
              Starting from
            </p>
            {discount ? (
              <div className="mt-2 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-900">
                  <MdDiscount className="text-emerald-600" />
                  <span className="text-2xl font-semibold">${finalPrice}</span>
                </div>
                <span className="text-sm text-rose-500 line-through">${price}</span>
              </div>
            ) : (
              <span className="mt-2 block text-2xl font-semibold text-slate-900">
                ${price}
              </span>
            )}
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            View stay
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookingItem;

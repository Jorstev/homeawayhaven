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
      className={`relative flex justify-between shadow-md border border-gray-100 cursor-pointer${
        luxury && currentURL.pathname !== "/login/console"
          ? "h-40 w-80 border-r-8 border-r-yellow-300"
          : "h-64 w-44 md:h-64 md:w-52 flex-col z-0 "
      } ${
        luxury && currentURL.pathname === "/login/console"
          ? "border-r-8 border-r-yellow-300"
          : ""
      }`}
    >
      {currentURL.pathname === "/login/console" ? (
        <>
          <EditButton
            position={"top-1/3 left-1/4"}
            onClick={handleEditBooking}
          />
          <DeleteButton
            position={"top-1/3 left-[55%]"}
            onClick={handleDeleteBooking}
          />
        </>
      ) : (
        ""
      )}

      <div
        className={`w-full  ${
          luxury && currentURL.pathname !== "/login/console"
            ? "h-full clip_polygon_luxury"
            : "h-44 clip_polygon"
        }`}
      >
        <img
          className="w-full h-44 bg-gray-300"
          src={image}
          alt="book-image"
          role="presentation"
          loading="lazy"
        />
      </div>
      <div
        className={`flex flex-col justify-between ${
          luxury && currentURL.pathname !== "/login/console" ? " pb-2" : " h-20"
        }`}
      >
        {currentURL.pathname === "/login/console" ? (
          ""
        ) : (
          <HeartBookmark
            position={`${
              luxury && currentURL.pathname !== "/login/console"
                ? "left-1 top-1"
                : "right-1 top-1"
            }`}
            bookmarkState={bookmarkState}
            onClick={handleBookmarkClick}
          />
        )}
        <div
          className={`${
            luxury && currentURL.pathname !== "/login/console"
              ? ""
              : "w-full pl-1"
          }`}
        >
          <span
            className={`text-base font-medium ${
              luxury && currentURL.pathname !== "/login/console"
                ? "text-right"
                : "whitespace-nowrap"
            }`}
          >
            {title}
          </span>
        </div>
        <div
          className={`flex justify-around${
            luxury && currentURL.pathname !== "/login/console"
              ? ` flex-col items-end space-y-1 pr-1 ${
                  discount ? "h-12" : "h-9"
                }`
              : ` w-full ${discount ? "h-12" : "h-6"}`
          }  `}
        >
          <div
            className={`flex space-x-1 ${
              discount ? "items-end" : "items-center"
            }`}
          >
            <IoLocationSharp className="text-cyan-300" />
            <span
              className={`text-xs font-light text-gray-400 ${
                luxury && currentURL.pathname !== "/login/console"
                  ? "whitespace-nowrap"
                  : ""
              }`}
            >
              {country}
            </span>
          </div>
          <div>
            {discount ? (
              <div className="flex flex-col justify-between h-12">
                <div className="flex space-x-1 items-center">
                  <MdDiscount className="text-green-600" />
                  <span>${handlediscountPrice(discount)}</span>
                </div>
                <span className="text-right text-sm text-red-500 line-through">
                  ${price}
                </span>
              </div>
            ) : (
              <span className="font-light">${price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookingItem;

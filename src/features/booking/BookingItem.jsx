import { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { Link } from "react-router-dom";
import HeartBookmark from "../../ui/HeartBookmark";
import toast from "react-hot-toast";

function BookingItem({ booking }) {
  const { booking_id, title, country, price, discount, classification, image } =
    booking;

  const discountPrice = (discount) =>
    (price - (discount / 100) * price).toFixed(2);

  const [bookmarkState, setBookmarkState] = useState(false);

  // Load initial bookmark state from localStorage
  useEffect(() => {
    const isBookmarked = localStorage.getItem(booking_id) !== null;
    setBookmarkState(isBookmarked);
  }, [booking_id]);

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
  };

  return (
    <Link
      to={`/booking/${booking_id}`}
      className="relative h-64 w-48 md:h-64 md:w-52 flex flex-col justify-between shadow-md border border-gray-100 cursor-pointer z-0"
    >
      <div className="w-full h-44 clip_polygon">
        <img
          className="w-full h-44 bg-gray-300"
          src={image}
          alt="book-image"
          role="presentation"
          loading="lazy"
        />
      </div>
      <HeartBookmark
        position={"right-1 top-1"}
        bookmarkState={bookmarkState}
        onClick={handleBookmarkClick}
      />
      <div className="w-full pl-1">
        <span className="text-base font-medium whitespace-nowrap">{title}</span>
      </div>
      <div
        className={`flex justify-around w-full  ${discount ? "h-12" : "h-6"}`}
      >
        <div
          className={`flex space-x-1 ${
            discount ? "items-end" : "items-center"
          }`}
        >
          <IoLocationSharp className="text-cyan-300" />
          <span className="text-xs font-light text-gray-400">{country}</span>
        </div>
        <div>
          {discount ? (
            <div className="flex flex-col justify-between h-12">
              <div className="flex space-x-1 items-center">
                <MdDiscount className="text-green-600" />
                <span>{discountPrice(discount)}</span>
              </div>
              <span className="text-right text-sm text-red-500 line-through">
                {price}
              </span>
            </div>
          ) : (
            <span className="font-light">${price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default BookingItem;

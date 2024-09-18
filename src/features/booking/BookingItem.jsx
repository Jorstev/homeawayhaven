import { IoLocationSharp } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { Link } from "react-router-dom";
import HeartBookmark from "../../ui/HeartBookmark";

function BookingItem({ booking }) {
  const {
    booking_id,
    title,
    country,

    price,
    discount,
    classification,
    image,
  } = booking;

  const discountPrice = (discount) =>
    (price - (discount / 100) * price).toFixed(2);

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
        onClick={(e) => {
          e.preventDefault();
          console.log(`bookmark ${booking_id}`);
          let data = {
            booking_id: booking_id,
            title: title,
            country: country,
            price: price,
            discount: discount,
            classification: classification,
            image: image,
          };
          // console.log(localStorage.getItem(booking_id));

          if (localStorage.getItem(booking_id) === null) {
            localStorage.setItem(booking_id, JSON.stringify(data));
          } else {
            localStorage.removeItem(booking_id);
          }
        }}
        booking={booking}
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

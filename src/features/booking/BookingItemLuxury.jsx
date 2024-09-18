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
    // luxury,
    image,
  } = booking;

  const discountPrice = (discount) =>
    (price - (discount / 100) * price).toFixed(2);

  return (
    <Link
      to={`/booking/${booking_id}`}
      className="relative h-40 w-80 flex justify-between shadow-md border border-gray-100 cursor-pointer border-r-8 border-r-yellow-300"
    >
      <div>
        <div className="w-full h-full clip_polygon_luxury">
          <img
            className="w-full h-44 bg-gray-300"
            src={image}
            alt="book-image"
            role="presentation"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between pb-2">
        <HeartBookmark position={"left-1 top-1"} />
        <div className="">
          <span className="text-base font-medium text-right">{title}</span>
        </div>
        <div
          className={`flex flex-col items-end space-y-1 justify-around pr-1 ${
            discount ? "h-12" : "h-9"
          }`}
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
              <span className="font-light text-sm">${price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookingItem;

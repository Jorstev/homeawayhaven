import { CiHeart } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";

function BookingItem({ booking }) {
  const {
    title,
    country,
    // latitude,
    // longitude,
    // maxCapacity,
    // description,
    price,
    discount,
    // classification,
    // luxury,
    image,
  } = booking;

  const discountPrice = (discount) =>
    (price - (discount / 100) * price).toFixed(2);

  return (
    <div className="relative h-64 w-48 md:h-64 md:w-52 flex flex-col justify-between shadow-md border border-gray-100 cursor-pointer">
      <div className="w-full h-44 clip_polygon">
        <img
          className="w-full h-44"
          src={image}
          alt="book-image"
          role="presentation"
          loading="lazy"
        />
      </div>
      <div className="absolute rounded-full p-2 bg-white right-1 top-1 cursor-pointer hover:scale-110 transition-transform duration-300">
        <CiHeart className="text-xl text-gray-500" />
      </div>
      <div className="w-full pl-2">
        <span className="text-base font-medium">{title}</span>
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

          <img
            className="h-5 w-5 object-contain"
            src="/costarica.jpg"
            alt="flag"
          />
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
    </div>
  );
}

export default BookingItem;

import { CiHeart } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";

function BookingItem() {
  return (
    <div className="relative h-64 w-44 flex flex-col justify-between shadow-md border border-gray-100 cursor-pointer">
      <div className="w-full h-44 clip_polygon">
        <img
          className="w-full h-full object-cover object-center"
          src="/testBookImage.jpg"
          alt="book-image"
        />
      </div>
      <div className="absolute rounded-full p-2 bg-white right-1 top-1 cursor-pointer hover:scale-110 transition-transform duration-300">
        <CiHeart className="text-xl text-gray-500" />
      </div>
      <div className="w-3/4 pl-2">
        <span className="text-base font-medium">Harvest Moon Hotel</span>
      </div>
      <div className="flex justify-around w-full h-6">
        <div className="flex space-x-1 items-center">
          <IoLocationSharp className="text-cyan-300" />
          <span className="text-xs font-light text-gray-400">Costa Rica</span>

          <img
            className="h-5 w-5 object-contain"
            src="/costarica.jpg"
            alt="flag"
          />
        </div>
        <div>
          <span className="font-light">$249.99</span>
        </div>
      </div>
    </div>
  );
}

export default BookingItem;

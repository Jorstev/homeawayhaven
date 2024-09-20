import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";

function HeartBookmark({ position, bookmarkState, onClick }) {
  return (
    <div
      className={`absolute rounded-full p-2 bg-white ${position} cursor-pointer hover:scale-110 transition-transform duration-300 z-10`}
      onClick={onClick}
    >
      {bookmarkState ? (
        <IoMdHeart className="text-xl text-gray-500" />
      ) : (
        <CiHeart className="text-xl text-gray-500" />
      )}
    </div>
  );
}

export default HeartBookmark;

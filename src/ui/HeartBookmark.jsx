import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";

function HeartBookmark({ position, bookmarkState, onClick }) {
  const placementClass = position === "static" ? "static" : `absolute ${position}`;

  return (
    <div
      className={`${placementClass} rounded-full p-2 bg-white cursor-pointer hover:scale-110 transition-transform duration-300 z-10`}
      onClick={onClick}
    >
      {bookmarkState ? (
        <IoMdHeart className="text-xl text-cyan-400" />
      ) : (
        <CiHeart className="text-xl text-cyan-400" />
      )}
    </div>
  );
}

export default HeartBookmark;

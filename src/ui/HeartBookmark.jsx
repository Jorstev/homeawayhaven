import { CiHeart } from "react-icons/ci";

function HeartBookmark({ position }) {
  return (
    <div
      className={`absolute rounded-full p-2 bg-white ${position} cursor-pointer hover:scale-110 transition-transform duration-300`}
    >
      <CiHeart className="text-xl text-gray-500" />
    </div>
  );
}

export default HeartBookmark;

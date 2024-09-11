import { CiHeart } from "react-icons/ci";

function HeartBookmark() {
  return (
    <div className="absolute rounded-full p-2 bg-white right-1 top-1 cursor-pointer hover:scale-110 transition-transform duration-300">
      <CiHeart className="text-xl text-gray-500" />
    </div>
  );
}

export default HeartBookmark;

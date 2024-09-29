import { GoBookmarkSlashFill } from "react-icons/go";
import { Link } from "react-router-dom";

function EmptyBookmark() {
  return (
    <div className="w-full flex flex-col justify-around items-center h-72">
      <h1>You have not bookmarked any bookings yet.</h1>
      <GoBookmarkSlashFill className="text-8xl" color="#e9ecef" />
      <Link
        to={"/booking"}
        className="h-10 w-32 rounded-md bg-cyan-400 text-white text-sm flex items-center justify-center"
      >
        Explore Bookings
      </Link>
    </div>
  );
}

export default EmptyBookmark;

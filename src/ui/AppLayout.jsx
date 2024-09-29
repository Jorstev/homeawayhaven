import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import useMediaQuery from "../utils/mediaQuery";
import { useQuery } from "@tanstack/react-query";
import { getAllBooking } from "../services/apiBookings";
import { BeatLoader } from "react-spinners";

function AppLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const [bookmarkBookings, setBookmarkBookings] = useState([]);

  const isActive = useMediaQuery("(min-width: 768px)");
  const {
    isPending,
    isError,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBooking,
  });
  // Function to fetch updated bookmarks
  const updateBookmarks = () => {
    const fetchedBookings = [];

    // Loop through localStorage to get bookmarks
    for (const key in localStorage) {
      if (
        localStorage.getItem(key) !== false &&
        localStorage.getItem(key) !== null &&
        key !== "TanstackQueryDevtools.open"
      ) {
        try {
          const booking = JSON.parse(localStorage.getItem(key));
          if (booking && booking.booking_id) {
            fetchedBookings.push(booking);
          }
        } catch (error) {
          console.error(
            `Error parsing localStorage item with key ${key}:`,
            error
          );
        }
      }
    }
    setBookmarkBookings(fetchedBookings);
  };

  useEffect(() => {
    // Initial fetch when the component mounts
    updateBookmarks();
  }, []);

  return (
    <div className="md:grid md:grid-cols-[6rem_1fr] lg:grid-cols-[20rem_1fr]">
      <Header
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        isActive={isActive}
      />
      {isActive === true || (showMenu === false && isActive === false) ? (
        <main className="h-[85vh] w-full md:h-lvh overflow-x-auto overflow-y-auto relative">
          {isPending ? (
            <BeatLoader
              color="#3CD2D2"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : (
            <Outlet
              context={{
                isPending,
                isError,
                bookings,
                error,
                bookmarkBookings,
                setBookmarkBookings,
                updateBookmarks, // Pass the function to update bookmarks
              }}
            />
          )}
        </main>
      ) : (
        ""
      )}
    </div>
  );
}

export default AppLayout;

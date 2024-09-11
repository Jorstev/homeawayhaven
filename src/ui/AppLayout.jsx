import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import useMediaQuery from "../utils/mediaQuery";
import { useQuery } from "@tanstack/react-query";
import { getAllBooking } from "../services/apiBookings";
import { BeatLoader } from "react-spinners";

function AppLayout() {
  const [showMenu, setShowMenu] = useState(false);

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

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export function usePaginationCalc(currentPage, bookings) {
  const activeFilter = useSelector((state) => state.booking.activeFilter);
  const itemsPerPage = 8;
  const currentURL = useLocation();

  const bookingType = currentURL.pathname.slice(1);

  const filterType = {
    booking: {
      PagesCalc: Math.ceil(
        bookings?.filter((booking) =>
          activeFilter
            ? booking.classification === activeFilter &&
              booking.discount === 0 &&
              booking.luxury === false
            : booking.discount === 0 && booking.luxury === false
        ).length / itemsPerPage
      ),
      ItemsPerPageCalc: bookings
        ?.filter((booking) =>
          activeFilter
            ? booking.classification === activeFilter &&
              booking.discount === 0 &&
              booking.luxury === false
            : booking.discount === 0 && booking.luxury === false
        )
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    },
    luxury: {
      PagesCalc: Math.ceil(
        bookings?.filter((booking) =>
          activeFilter
            ? booking.classification === activeFilter &&
              (booking.discount === 0 || booking.discount === null) &&
              booking.luxury === true
            : (booking.discount === 0 || booking.discount === null) &&
              booking.luxury === true
        ).length / itemsPerPage
      ),
      ItemsPerPageCalc: bookings
        ?.filter((booking) =>
          activeFilter
            ? booking.classification === activeFilter &&
              (booking.discount === 0 || booking.discount === null) &&
              booking.luxury === true
            : (booking.discount === 0 || booking.discount === null) &&
              booking.luxury === true
        )
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    },
    promotion: {
      PagesCalc: Math.ceil(
        bookings?.filter((booking) =>
          activeFilter
            ? booking.classification === activeFilter &&
              booking.discount !== 0 &&
              booking.luxury === false
            : booking.discount !== 0 && booking.luxury === false
        ).length / itemsPerPage
      ),
      ItemsPerPageCalc: bookings
        ?.filter((booking) =>
          activeFilter
            ? booking.classification === activeFilter &&
              booking.discount !== 0 &&
              booking.luxury === false
            : booking.discount !== 0 && booking.luxury === false
        )
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    },
  };

  const totalPages = filterType[bookingType].PagesCalc;

  const filteredBookings = filterType[bookingType].ItemsPerPageCalc;

  return { totalPages, filteredBookings, bookingType };
}

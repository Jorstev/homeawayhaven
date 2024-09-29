import { useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";

function ReservationConfirmation() {
  const formData = useSelector((state) => state.booking.formData);
  const { firstName, Calendar, emailAddress, lastName } = formData;

  const { booking_id } = useParams();
  const { bookings } = useOutletContext();
  const bookingDetails = bookings.find(
    (booking) => booking.booking_id === booking_id
  );
  const {
    title,
    country,
    maxCapacity,

    price,
    discount,

    numBeds,
    checkout,
  } = bookingDetails;

  const handlediscountPrice = (discount) => {
    if (discount === 0) {
      return null;
    } else {
      return (price - (discount / 100) * price).toFixed(2);
    }
  };

  return (
    <div className="max-w-3xl 2xl:max-w-5xl  min-w-[370px] mx-auto">
      <div className="h-full bg-white p-8 rounded-lg relative z-20 flex flex-col items-center space-y-4">
        <div className="w-12 mb-4">
          <img src="tablet_logo.png" alt="logo" />
        </div>

        <div className="text-xl font-semibold text-gray-800">
          Welcome to HomeAwayHaven, {firstName}!
        </div>

        <div className="text-gray-600 text-center">
          Your payment of{" "}
          <span className="font-bold text-green-500">
            $
            {discount !== 0
              ? `${handlediscountPrice(discount)} (🙌 Promotional Price)`
              : price}
          </span>{" "}
          has been processed successfully.
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full text-left space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Reservation Details
          </h2>

          <p className="text-gray-700">
            You have reserved at <span className="font-bold">{title}</span> from{" "}
            <span className="font-bold">
              {Calendar[0]?.toLocaleDateString()}
            </span>{" "}
            to{" "}
            <span className="font-bold">
              {Calendar[1]?.toLocaleDateString() || "N/A"}
            </span>
            .
          </p>

          <p className="text-gray-700">
            This reservation includes{" "}
            <span className="font-bold">{numBeds}</span> beds for a maximum
            capacity of <span className="font-bold">{maxCapacity}</span> guests.
          </p>

          <p className="text-gray-700">
            Located in: <span className="font-bold">{country}</span>
          </p>

          <p className="text-gray-700">
            Check-out time: <span className="font-bold">{checkout}</span>
          </p>
        </div>

        <div className="text-gray-600 text-center">
          <p>
            {firstName} {lastName}, we hope you enjoy your stay!
          </p>
          <p>
            Thank you for choosing HomeAwayHaven. Have a wonderful vacation!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReservationConfirmation;

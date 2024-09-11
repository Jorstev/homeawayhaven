import { useOutletContext, useParams } from "react-router-dom";

function BookingDetails() {
  const { booking_id } = useParams();
  const { bookings } = useOutletContext();
  const bookingDetails = bookings.find(
    (booking) => booking.booking_id === booking_id
  );
  console.log(bookingDetails);

  const {
    title,
    country,
    // latitude,
    // longitude,
    // maxCapacity,
    // description,
    price,
    discount,
    // classification,
    // luxury,
    image,
  } = bookingDetails;
  // Now you can use the booking_id to load data based on this parameter
  console.log(booking_id);
  return (
    <div className="max-w-3xl 2xl:max-w-5xl min-w-[370px] mx-auto flex flex-col">
      <div className=" h-80 w-full ">
        <img
          className="w-full h-full object-cover object-center"
          src={image}
          alt="booking-image"
        />
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default BookingDetails;

import { useOutletContext, useParams } from "react-router-dom";
import HeartBookmark from "../ui/HeartBookmark";
import ReservationDetail from "../features/booking/ReservationDetail";
import Amenity from "../features/booking/Amenity";
import { getAllAmenitiesById } from "../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function BookingDetails() {
  const { booking_id } = useParams();
  const { bookings } = useOutletContext();
  const bookingDetails = bookings.find(
    (booking) => booking.booking_id === booking_id
  );

  const {
    isPending,
    isError,
    error,
    data: amenities,
  } = useQuery({
    queryKey: ["amenities"],
    queryFn: () => getAllAmenitiesById(booking_id),
  });

  const {
    title,
    country,
    // latitude,
    // longitude,
    maxCapacity,
    description,
    price,
    discount,
    // classification,
    // luxury,
    image,
  } = bookingDetails;
  // Now you can use the booking_id to load data based on this parameter

  return (
    <div className="max-w-3xl 2xl:max-w-5xl min-w-[370px] mx-auto flex flex-col ">
      <section className=" h-80 w-full relative">
        <img
          className="w-full h-full object-cover object-center"
          src={image}
          alt="booking-image"
        />
        <HeartBookmark position={"top-2.5 left-2.5 z-10"} />
        <div className="w-full h-full bg-black opacity-15 absolute top-0 left-0 z-0"></div>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-3xl opacity-0 transition-opacity duration-1000 animate-fade-in text-center">
          {title}
        </h1>
      </section>
      <section className="px-3">
        <section className="flex border-b border-b-gray-300 py-7  ">
          <div className="pr-5 text-justify text-base">{description}</div>
          <div className="flex flex-col space-y-2">
            <button className="h-10 w-20 rounded-md bg-cyan-400 text-white text-sm">
              Reserve
            </button>
            <button className="h-10 w-20 rounded-md bg-gray-100 text-cyan-400 text-sm">
              ${price}
            </button>
          </div>
        </section>
        <section className="border-b border-b-gray-300 py-7 ">
          <h3 className="pb-7 font-semibold">Reservation Details</h3>
          <div className="flex gap-3 flex-wrap justify-center md:justify-evenly">
            <ReservationDetail maxCapacity={maxCapacity} detail={"capacity"} />
            <ReservationDetail maxCapacity={maxCapacity} detail={"bed"} />
            <ReservationDetail maxCapacity={maxCapacity} detail={"time"} />
          </div>
        </section>
        <section className="border-b border-b-gray-300 py-7 ">
          <h3 className="pb-7 font-semibold">Amenities</h3>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-4">
            {amenities?.map((amenity) => (
              <Amenity
                amenityValue={amenity.amenities.amenity}
                key={amenity.amenity_id}
              />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default BookingDetails;

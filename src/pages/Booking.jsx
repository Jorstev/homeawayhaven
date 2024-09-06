import BookingItem from "../features/booking/BookingItem";

function Booking() {
  return (
    <div className="max-w-3xl 2xl:max-w-5xl  min-w-[370px] mx-auto">
      <h1 className="py-7 pl-3 sm:pl-20 md:pl-10 text-2xl font-semibold">
        Booking
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 place-items-center gap-y-10">
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
        <BookingItem />
      </div>
    </div>
  );
}

export default Booking;

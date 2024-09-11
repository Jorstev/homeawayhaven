import ButtonFilter from "./ButtonFilter";

function BookingFilter() {
  return (
    <div className="grid place-items-center pt-7">
      <div className="border border-gray-300 grid-cols-3 p-2 gap-4 grid">
        <ButtonFilter filterType={"hotel"} />
        <ButtonFilter filterType={"cabin"} />
        <ButtonFilter filterType={"house"} />
      </div>
    </div>
  );
}

export default BookingFilter;

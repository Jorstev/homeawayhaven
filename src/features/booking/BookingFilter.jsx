import { useState } from "react";
import ButtonFilter from "./ButtonFilter";

function BookingFilter() {
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <div className="grid place-items-center pt-7">
      <div className="border border-gray-300 grid-cols-3 p-2 gap-4 grid">
        <ButtonFilter
          filterType={"Hotels"}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ButtonFilter
          filterType={"Cabins"}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ButtonFilter
          filterType={"Houses"}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
    </div>
  );
}

export default BookingFilter;

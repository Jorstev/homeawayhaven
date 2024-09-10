import { useState } from "react";
import ButtonFilter from "./ButtonFilter";

function BookingFilter({ activeFilter, setActiveFilter }) {
  return (
    <div className="grid place-items-center pt-7">
      <div className="border border-gray-300 grid-cols-3 p-2 gap-4 grid">
        <ButtonFilter
          filterType={"hotel"}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ButtonFilter
          filterType={"cabin"}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <ButtonFilter
          filterType={"house"}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
    </div>
  );
}

export default BookingFilter;

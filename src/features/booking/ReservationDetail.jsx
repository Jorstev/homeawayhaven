import { FaUsers } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { IoBed } from "react-icons/io5";

function ReservationDetail({ maxCapacity, detail, numBeds, checkout }) {
  const type = {
    bed: {
      name: "Beds",
      icon: <IoBed className="text-xl" color="#be2525" />,
      value: numBeds,
    },
    capacity: {
      name: "Capacity",
      icon: <FaUsers className="text-xl" color="#be2525" />,
      value: maxCapacity,
    },
    time: {
      name: "Check Out Time",
      icon: <GoClockFill className="text-xl" color="#be2525" />,
      value: checkout,
    },
  };
  return (
    <div className="w-44 bg-gray-50 flex flex-col items-center text-center justify-center py-2 shadow-md">
      <div className="w-full flex items-center px-1 justify-evenly">
        {type[detail].icon}
        <span className=" font-light text-sm">{type[detail].name}</span>
      </div>
      <div className="text-3xl text-cyan-400">{type[detail].value}</div>
    </div>
  );
}

export default ReservationDetail;

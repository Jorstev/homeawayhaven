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
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] px-4 py-5 shadow-[0_14px_32px_rgba(148,163,184,0.18)]">
      <div className="flex items-center justify-between gap-3">
        {type[detail].icon}
        <span className="text-sm font-medium text-slate-500">{type[detail].name}</span>
      </div>
      <div className="mt-4 text-3xl font-semibold text-cyan-500">{type[detail].value}</div>
    </div>
  );
}

export default ReservationDetail;

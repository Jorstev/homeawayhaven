import { useDispatch, useSelector } from "react-redux";
import { setActiveFilter } from "./bookingSlice";

function ButtonFilter({ filterType }) {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.booking.activeFilter);

  const getButtonClass = (filter) => {
    return activeFilter === filter
      ? "border-slate-900 bg-slate-900 text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]"
      : "border-transparent bg-white text-slate-600 hover:border-cyan-200 hover:text-cyan-700";
  };

  return (
    <button
      className={`rounded-2xl border px-5 py-3 text-sm font-semibold capitalize transition-colors duration-200 ${getButtonClass(
        filterType
      )}`}
      onClick={() =>
        dispatch(setActiveFilter(filterType))
      }
    >
      {filterType}
    </button>
  );
}

export default ButtonFilter;

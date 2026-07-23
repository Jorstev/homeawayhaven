import ButtonFilter from "./ButtonFilter";

function BookingFilter() {
  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white/82 p-4 shadow-[0_20px_50px_rgba(148,163,184,0.16)] backdrop-blur-sm md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
            Filter collection
          </p>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Switch between hotels, cabins, and houses without leaving the listing flow.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 rounded-[1.25rem] border border-slate-200/80 bg-slate-50 p-2">
        <ButtonFilter filterType={"hotel"} />
        <ButtonFilter filterType={"cabin"} />
        <ButtonFilter filterType={"house"} />
        </div>
      </div>
    </div>
  );
}

export default BookingFilter;

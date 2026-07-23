function AmenitySelector({
  options,
  selectedAmenityIds,
  onToggleAmenity,
}) {
  const selectedAmenities = options.filter((option) =>
    selectedAmenityIds.includes(String(option.amenity_id))
  );

  return (
    <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-50/80 p-5 shadow-inner shadow-slate-100 md:p-6">
      <div className="flex flex-col gap-2 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-600">
          Amenities
        </p>
        <h3 className="text-2xl font-semibold text-slate-900">
          Adjust included amenities
        </h3>
        <p className="text-sm leading-6 text-slate-600">
          Keep the current amenities selected and use the dropdown to add or remove the rest.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pb-5">
        {selectedAmenities.length > 0 ? (
          selectedAmenities.map((amenity) => (
            <span
              key={amenity.amenity_id}
              className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700"
            >
              {amenity.label}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-500">No amenities selected.</span>
        )}
      </div>

      <details className="group rounded-[1.25rem] border border-slate-200 bg-white shadow-sm">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-sm font-semibold text-slate-700">
          <span>Select amenities</span>
          <span className="text-cyan-600 transition group-open:rotate-45">+</span>
        </summary>

        <div className="grid gap-3 border-t border-slate-200 px-4 py-4 md:grid-cols-2">
          {options.map((amenity) => {
            const isSelected = selectedAmenityIds.includes(String(amenity.amenity_id));

            return (
              <label
                key={amenity.amenity_id}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                  isSelected
                    ? "border-cyan-300 bg-cyan-50 text-cyan-800"
                    : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleAmenity(String(amenity.amenity_id))}
                  className="h-4 w-4 accent-cyan-500"
                />
                <span>{amenity.label}</span>
              </label>
            );
          })}
        </div>
      </details>
    </div>
  );
}

export default AmenitySelector;
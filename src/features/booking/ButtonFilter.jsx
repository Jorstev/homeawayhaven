function ButtonFilter({ filterType, activeFilter, setActiveFilter }) {
  const getButtonClass = (filter) => {
    console.log(filter);

    return activeFilter === filter
      ? "bg-gradient-to-r from-cyan-500 to-cyan-300 text-white border-cyan-300"
      : "hover:bg-gray-100 hover:border-gray-100";
  };
  return (
    <button
      className={`border border-gray-300 px-7 py-2 rounded-md relative ${getButtonClass(
        filterType
      )}`}
      onClick={() => setActiveFilter(filterType)}
    >
      {filterType}
      {filterType !== "Houses" && (
        <div className="absolute w-[16px] h-2 bg-gray-200 -right-[17px] top-1/2 -translate-y-1/2"></div>
      )}
    </button>
  );
}

export default ButtonFilter;

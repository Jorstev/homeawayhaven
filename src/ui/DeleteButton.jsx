import { MdDelete } from "react-icons/md";

function DeleteButton({ position, onClick }) {
  const placementClass = position === "static" ? "static" : `absolute ${position}`;

  return (
    <div
      className={`${placementClass} rounded-full bg-white p-1 cursor-pointer hover:scale-110 transition-transform duration-300 z-10 shadow-lg`}
      onClick={onClick}
    >
      <MdDelete color="#F24E1E" className="text-4xl" />
    </div>
  );
}

export default DeleteButton;

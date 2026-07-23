import { RiEditCircleFill } from "react-icons/ri";

function EditButton({ position, onClick }) {
  const placementClass = position === "static" ? "static" : `absolute ${position}`;

  return (
    <div
      className={`${placementClass} rounded-full bg-white p-1 cursor-pointer hover:scale-110 transition-transform duration-300 z-10 shadow-lg`}
      onClick={onClick}
    >
      <RiEditCircleFill color="#FFDF00" className="text-4xl" />
    </div>
  );
}

export default EditButton;

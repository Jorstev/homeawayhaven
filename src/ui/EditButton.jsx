import { RiEditCircleFill } from "react-icons/ri";

function EditButton({ position, onClick }) {
  return (
    <div
      className={`absolute rounded-full p-1 bg-white ${position} cursor-pointer hover:scale-110 transition-transform duration-300 z-10 shadow-lg`}
      onClick={onClick}
    >
      <RiEditCircleFill color="#FFDF00" className="text-4xl" />
    </div>
  );
}

export default EditButton;

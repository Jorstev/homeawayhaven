import { MdDelete } from "react-icons/md";

function DeleteButton({ position, onClick }) {
  return (
    <div
      className={`absolute rounded-full p-1 bg-white ${position} cursor-pointer hover:scale-110 transition-transform duration-300 z-10 shadow-lg`}
      onClick={onClick}
    >
      <MdDelete color="#F24E1E" className="text-4xl" />
    </div>
  );
}

export default DeleteButton;

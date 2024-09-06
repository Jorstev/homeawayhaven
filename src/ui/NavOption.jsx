import { IoIosBookmark } from "react-icons/io";
import { IoBed, IoDiamond } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function NavOption({ endpoint, title, setShowMenu, showMenu, iconType }) {
  const renderIcon = (isActive) => {
    switch (iconType) {
      case "bed":
        return (
          <IoBed
            color={isActive ? "white" : "#be2525"}
            className="text-3xl w-1/12 md:w-10"
          />
        );
      case "discount":
        return (
          <MdDiscount
            color={isActive ? "white" : "#be2525"}
            className="text-3xl w-1/12 md:w-10"
          />
        );
      case "diamond":
        return (
          <IoDiamond
            color={isActive ? "white" : "#be2525"}
            className="text-3xl w-1/12 md:w-10"
          />
        );
      case "bookmark":
        return (
          <IoIosBookmark
            color={isActive ? "white" : "#be2525"}
            className="text-3xl w-1/12 md:w-10"
          />
        );
      default:
        return (
          <RiAdminFill
            color={isActive ? "white" : "#be2525"}
            className="text-3xl w-1/12 md:w-10"
          />
        ); // Return null or another icon as default
    }
  };
  return (
    <NavLink
      to={endpoint}
      className={({ isActive }) => (isActive ? "active" : "inactive")}
      onClick={() => setShowMenu(!showMenu)}
    >
      {({ isActive }) => (
        <>
          {renderIcon(isActive)}

          <span className="w-1/2 md:hidden lg:block lg:text-base">{title}</span>
        </>
      )}
    </NavLink>
  );
}

export default NavOption;

import { LiaBarsSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import NavOption from "./NavOption";
import { useSelector } from "react-redux";

function Header({ showMenu, setShowMenu, isActive }) {
  const adminLoginState = useSelector((state) => state.booking.adminValidation);
  return (
    <>
      <header className=" md:grid relative md:border-r md:border-gray-200">
        <div className="h-[15vh]">
          <div className="absolute left-6 top-8 translate-y-1/2 md:hidden">
            {showMenu ? (
              <IoMdClose
                className="text-2xl cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />
            ) : (
              <LiaBarsSolid
                className="text-2xl cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />
            )}
          </div>
          <div className="h-full flex items-center justify-center md:items-start md:mt-10 lg:mb-40">
            <img
              className="max-h-20 md:hidden lg:block"
              src="/public/logo.png"
              alt="logo"
            />
            <img
              className="max-h-12 hidden md:block lg:hidden"
              src="/public/tablet_logo.png"
              alt="logo"
            />
          </div>
        </div>
        {showMenu || isActive ? (
          <nav className="h-[85vh] flex flex-col justify-between md:pt-10">
            <div>
              <NavOption
                endpoint={"/booking"}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                title={"Booking"}
                iconType={"bed"}
              />
              <NavOption
                endpoint={"/promotion"}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                title={"Booking Promotions"}
                iconType={"discount"}
              />
              <NavOption
                endpoint={"/luxury"}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                title={"Booking Luxury"}
                iconType={"diamond"}
              />
              <NavOption
                endpoint={"/bookmark"}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                title={"Bookmark"}
                iconType={"bookmark"}
              />
            </div>
            <div>
              <NavOption
                endpoint={`${adminLoginState ? "/login/console" : "/login"}`}
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                title={"Administration"}
              />
            </div>
          </nav>
        ) : (
          ""
        )}
      </header>
    </>
  );
}

export default Header;

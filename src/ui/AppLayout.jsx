import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import useMediaQuery from "../utils/mediaQuery";

function AppLayout() {
  const [showMenu, setShowMenu] = useState(false);

  const isActive = useMediaQuery("(min-width: 768px)");

  return (
    <div className="md:grid md:grid-cols-[6rem_1fr] lg:grid-cols-[20rem_1fr]">
      <Header
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        isActive={isActive}
      />
      {isActive === true || (showMenu === false && isActive === false) ? (
        <main className="h-[85vh] w-full md:h-lvh overflow-x-auto overflow-y-auto">
          <Outlet />
        </main>
      ) : (
        ""
      )}
    </div>
  );
}

export default AppLayout;

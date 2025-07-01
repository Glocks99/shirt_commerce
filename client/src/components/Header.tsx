import { Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useAppContext();

  return (
    <header className="flex items-center justify-between gap-2.5 px-4 sm:px-10 h-[60px] border-b border-gray-300 shadow-sm bg-white z-50">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className=" text-gray-800"
      >
        <img src="assets/logo1.png" className="w-[50px]" alt="" />
      </div>

      {/* Navigation - Desktop */}
      <ul className="hidden sm:flex text-sm items-center gap-4 bg-gray-100 h-[40px] px-1.5 rounded-full">
        {[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
        ].map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-500 text-white px-3.5 py-1.5 rounded-full font-medium"
                  : "text-gray-700 hover:text-blue-500 px-3.5 py-1.5"
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="block sm:hidden cursor-pointer"
      >
        <Menu />
      </div>
    </header>
  );
};

export default Header;

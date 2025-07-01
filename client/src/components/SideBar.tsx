import { X, ShoppingCart, User } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const { isOpen, setIsOpen, user } = useAppContext();
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[80%] max-w-[280px] bg-white shadow-lg z-50 p-5 space-y-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm sm:text-lg font-bold tracking-wide text-gray-800">
            YOLO<span className="text-blue-600">'s</span> COLLECTION
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-3 text-gray-700 font-medium">
          {["Home", "Shop", "About", "Contact"].map((navi, i) => (
            <Link
              key={i}
              to={
                navi.toLowerCase() === "home" ? "/" : "/" + navi.toLowerCase()
              }
              onClick={() => setIsOpen(false)}
              className="block hover:text-black"
            >
              {navi}
            </Link>
          ))}
        </nav>

        {/* Utility Options */}
        <div className="border-t border-t-black/25 pt-4 space-y-3">
          <Link
            to={"/profile"}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-gray-700"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <Link
            to={"/cart"}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-gray-700"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </Link>
        </div>

        {/* Auth Buttons */}
        {!user.isLoggedIn && (
          <div className="border-t border-t-black/25 pt-4 flex flex-col gap-2">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-2 px-4 border border-black/25  rounded hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-gray-800"
          >
            Sign Up
          </button>
        </div>
        )}
        
        <div className="border-t border-t-black/25 text-sm text-center py-4 px-4">
          © {new Date().getFullYear()} Yolo's collections. All rights reserved.
        </div>
      </aside>
    </>
  );
};

export default SideBar;

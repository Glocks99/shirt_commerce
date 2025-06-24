import {
  Search,
  ShoppingBag,
  LogIn,
  User,
  LogOut,
  Shield,
  List,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import useGetCategories from "../hooks/useGetCategories";

const SubHeader = () => {
  const { cart } = useAppContext();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [shopCat, setShopCat] = useState(false);

  const navigate = useNavigate();

  const [cat] = useGetCategories();

  // Toggle account menu on mobile
  const handleAccountClick = () => {
    setIsAccountOpen((prev) => !prev);
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-30">
      <div className="h-[60px] flex gap-2.5 items-center justify-between px-4 sm:px-10">
        {/* Left: Menu toggle */}
        <div className="relative flex items-center gap-2 cursor-pointer">
          <List onClick={() => setShopCat(!shopCat)} />
          <span className="text-sm font-medium">Shop by category</span>

          <div
            className={`absolute w-[150px] left-0 top-[100%] duration-300 ${
              shopCat ? "h-[260px] opacity-100" : "h-0 opacity-0"
            } transform translate-y-5 rounded bg-white text-sm flex flex-col`}
          >
            {cat.map((item, i) => (
              <p key={i} className="p-1.5 w-full hover:bg-black/30">
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden sm:flex items-center flex-1 max-w-xl border border-gray-300 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search products"
            className="flex-1 px-4 py-2 focus:outline-none"
          />
          <Search className="px-3 text-gray-500" />
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          {/* User icon */}
          <div
            className="relative"
            onMouseEnter={() =>
              window.innerWidth >= 640 && setIsAccountOpen(true)
            }
            onMouseLeave={() =>
              window.innerWidth >= 640 && setIsAccountOpen(false)
            }
          >
            <User className="cursor-pointer" onClick={handleAccountClick} />

            {/* Account Menu */}
            {isAccountOpen && (
              <div className="absolute right-0  w-48 bg-white border border-gray-700/30 rounded shadow-md text-sm">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-1.5 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <LogIn size={16} />
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="flex items-center gap-1.5 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Signup
                </button>
                <button
                  onClick={() => navigate("/verify")}
                  className="flex items-center gap-1.5 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <Shield size={16} />
                  Verify Now
                </button>
                <button
                  onClick={() => navigate("/logout")}
                  className="flex items-center gap-1.5 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Shopping bag with badge */}
          <Link to={"/cart"} className="relative cursor-pointer">
            <ShoppingBag />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cart.length}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile search bar below */}
      <div className="sm:hidden px-4 pb-2">
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search products"
            className="flex-1 px-4 py-2 focus:outline-none"
          />
          <Search className="px-3 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default SubHeader;

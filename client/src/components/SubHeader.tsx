import {
  Search,
  ShoppingBag,
  LogIn,
  User,
  LogOut,
  Shield,
  List,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import useGetCategories from "../hooks/useGetCategories";
import { toast } from "react-toastify";

const SubHeader = () => {
  const { cart, checkIsUserLoggedIn } = useAppContext();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [shopCat, setShopCat] = useState(false);

  const navigate = useNavigate();

  const [cat] = useGetCategories();

  // Toggle account menu on mobile
  const handleAccountClick = () => {
    setIsAccountOpen((prev) => !prev);
  };

  const logoutHandler = async() => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        toast.success("Logout successful");
        // Clear user data from localStorage
        localStorage.removeItem("cart");
        localStorage.removeItem("user");
        checkIsUserLoggedIn();
        navigate("/");
      } else {
        throw new Error("Logout failed");
      }
      
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error (e.g., show a toast notification)
      setTimeout(() => {
        toast.error("Logout failed. Please try again.");
      }, 1000);
      
    }
  }

  const { user } = useAppContext();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-30">
      <div className="h-[60px] flex gap-2.5 items-center justify-between px-4 sm:px-10">
        {/* Left: Menu toggle */}
        <div className="relative flex items-center gap-2 cursor-pointer">
          <List onClick={() => setShopCat(!shopCat)} />
          <span className="text-sm font-medium">Shop by category</span>

          {shopCat && (
              <div
            className="absolute top-[100%] mt-3.5 bg-white rounded shadow-xl shadow-black flex flex-col"
          >
            {cat.map((item, i) => (
              <p key={i} className="p-1.5 w-full hover:bg-black/30">
                {item.name}
              </p>
            ))}
          </div>
          )}
          
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
            {!user.isLoggedIn ? (
              <User className="cursor-pointer" onClick={handleAccountClick} />
            ): (
              <div onClick={handleAccountClick} className="bg-gradient-to-tr from-yellow-500 to-yellow-300 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                {user.userData?.firstName[0].toUpperCase()}
              </div>
            )}
            

            {/* Account Menu */}
            {isAccountOpen && (
              <div className="absolute right-0  w-48 bg-white border border-gray-700/30 rounded shadow-md text-sm">
                {!user.isLoggedIn && (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-1.5 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <LogIn size={16} />
                  Login
                </button>
                )}
                { !user.isLoggedIn && (
                  <button
                  onClick={() => navigate("/signup")}
                  className="flex items-center gap-1.5 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Signup
                </button>
                )}
                {!user.userData?.isVerified && user.isLoggedIn && (
                  <button
                  onClick={() => navigate("/verify")}
                  className="flex items-center gap-1.5 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <Shield size={16} />
                  Verify Now
                </button>
                )}
                {user.isLoggedIn && (
                  <button onClick={() => navigate("/profile")} className="hidden sm:flex items-center gap-1.5 w-full text-left px-4 py-2 hover:bg-gray-100">
                  <UserCheck size={16} />
                  My profile</button>
                )}
                
                
                { user.isLoggedIn && (

                <button
                  onClick={() => logoutHandler()}
                  className="flex items-center gap-1.5 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Logout
                </button>
                )}
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

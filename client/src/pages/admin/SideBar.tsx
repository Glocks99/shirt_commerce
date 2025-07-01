
import { Home, Users, Package, Settings, LogOut, ClipboardCheckIcon } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type SideBarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const SideBar = ({ activeTab, setActiveTab }: SideBarProps) => {
  const {isOpen, setIsOpen, checkIsUserLoggedIn} = useAppContext();
  const navigate = useNavigate()

  const logout = async() => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        withCredentials: true
      })

      if(data.message){
         toast.success(data.message);
        // Clear user data from localStorage
        localStorage.removeItem("cart");
        localStorage.removeItem("user");
        checkIsUserLoggedIn();
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message)
    }

  }

  return (
    <>
      <aside
        className={`fixed z-30 top-0 left-0 h-full bg-black text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-64`}
      >
        <div className="p-6 font-bold text-xl border-b border-gray-800 flex justify-between items-center">
          Dashboard
          <button
            className="md:hidden text-xl"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <button
            className={`flex items-center w-full px-4 py-2 rounded hover:bg-gray-800 transition ${
              activeTab === "overview" ? "bg-gray-800" : ""
            }`}
            onClick={() => { setActiveTab("overview"); setIsOpen(false); }}
          >
            <Home className="mr-3" size={20} />
            Overview
          </button>
          <button
            className={`flex items-center w-full px-4 py-2 rounded hover:bg-gray-800 transition ${
              activeTab === "orders" ? "bg-gray-800" : ""
            }`}
            onClick={() => { setActiveTab("orders"); setIsOpen(false); }}
          >
            <ClipboardCheckIcon className="mr-3" size={20} />
            Orders
          </button>
          <button
            className={`flex items-center w-full px-4 py-2 rounded hover:bg-gray-800 transition ${
              activeTab === "products" ? "bg-gray-800" : ""
            }`}
            onClick={() => { setActiveTab("products"); setIsOpen(false); }}
          >
            <Package className="mr-3" size={20} />
            Products
          </button>
          <button
            className={`flex items-center w-full px-4 py-2 rounded hover:bg-gray-800 transition ${
              activeTab === "users" ? "bg-gray-800" : ""
            }`}
            onClick={() => { setActiveTab("users"); setIsOpen(false); }}
          >
            <Users className="mr-3" size={20} />
            Users
          </button>
          <button
            className={`flex items-center w-full px-4 py-2 rounded hover:bg-gray-800 transition ${
              activeTab === "settings" ? "bg-gray-800" : ""
            }`}
            onClick={() => { setActiveTab("settings"); setIsOpen(false); }}
          >
            <Settings className="mr-3" size={20} />
            Settings
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={() => logout()}   className="flex items-center cursor-pointer w-full px-4 py-2 rounded hover:bg-red-600 transition">
            <LogOut className="mr-3" size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;

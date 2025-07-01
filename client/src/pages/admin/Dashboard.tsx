import { useState } from "react";
import SideBar from "./SideBar";
import { Menu} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Overview from "./Overview";
import Orders from "./Orders";
import Products from "./Products";
import Users from "./Users";
import Settings from "./Settings";



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const {isOpen, setIsOpen} = useAppContext();
 


  return (
    <div className="min-h-screen flex bg-gray-100">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 px-[16px] sm:px-[40px] overflow-y-auto md:ml-64">
        <header className="flex flex-col items-center mb-8 pt-2">
          <div className="flex items-center mb-2.5  gap-1 w-full">
            <button
              className="sm:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu />
            </button>

            <div
              onClick={() => navigate("/admin/dashboard")}
              className="text-lg sm:text-lg font-bold tracking-wide text-gray-800"
            >
              YOLO<span className="text-blue-600">'s</span> COLLECTION
            </div>
          </div>

          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-full border rounded focus:outline-none"
            />
          </div>
        </header>

        {activeTab === "overview" && (
          <Overview />
        )}

        {activeTab === "orders" && (
          <Orders />
        )}

        {activeTab === "products" && (
          <Products />
        )}

        {activeTab === "users" && (
          <Users />
        )}

        {activeTab === "settings" && (
         <Settings />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Product from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import SideBar from "./components/SideBar";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SubHeader from "./components/SubHeader";
import Profile from "./pages/Profile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/admin/Dashboard";
import { useAppContext } from "./context/AppContext";
import Featuring from "./pages/Featuring";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Router>
        <AppContent />
      </Router>
    </>
  );
}

function AppContent() {
  const { user } = useAppContext();
  const location = useLocation();

  return (
    <>
      {!user?.userData?.isAdmin && <SideBar />}

      {/* Show Header except for admin or /feat route */}
      {(!user?.userData?.isAdmin && location.pathname !== "/feat") && (
        <Header />
      )}

      {!user?.userData?.isAdmin && location.pathname !== "/feat" && <SubHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/feat" element={<Featuring />} />
        <Route path="*" element={<Error />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>

      {!user?.userData?.isAdmin && location.pathname !== "/feat" && <Footer />}
    </>
  );
}

export default App;

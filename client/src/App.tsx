import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header"; // If this duplicates nav, adjust accordingly
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

function App() {
  return (
    <>
      <Router>
        <SideBar />
        <Header />
        <SubHeader />

        {/* Main routes */}
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
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;

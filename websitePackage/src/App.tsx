import { Routes, Route, Link } from "react-router-dom";
import Contact from "./pages/Contact.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import "./App.css";
import Navbar from "./pages/Navbar.js";
import PaymentPage from "./pages/paymentPage";

import Footer from "./pages/footer.js";
import ListingsPage from "./pages/ListingsPage.js";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/paymentPage" element={<PaymentPage />}></Route>
        <Route path="/ShowListings" element={<ListingsPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductDetails from "./pages/ProductDetails";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />

        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />

        <Route
          path="/orders"
          element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
        />

        <Route path="/product/:id" element={<ProductDetails />} />


        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/products" />
            )
          }
        />

        <Route
          path="/register"
          element={
            !isLoggedIn ? (
              <Register setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/products" />
            )
          }
        />

        <Route
          path="/admin"
          element={isLoggedIn ? <AdminOrders /> : <Navigate to="/login" />}
        />

        <Route
          path="/checkout"
          element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
        />

        <Route
          path="/payment-success"
          element={isLoggedIn ? <PaymentSuccess /> : <Navigate to="/login" />}
        />


      </Routes>
    </Router>
  );
}

export default App;

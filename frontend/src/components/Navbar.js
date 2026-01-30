import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  let role = "user";

  const token = localStorage.getItem("token");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role || "user";
    } catch (err) {
      role = "user";
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <h2>E-Commerce App</h2>

      <div className="nav-links">
        <Link to="/products">Products</Link>

        {/* USER ONLY */}
        {isLoggedIn && role === "user" && (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
          </>
        )}

        {/* ADMIN ONLY */}
        {isLoggedIn && role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/register">Register</Link>}

        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

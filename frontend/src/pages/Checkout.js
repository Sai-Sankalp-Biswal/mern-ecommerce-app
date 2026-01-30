import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const items = state?.items || [];
  const token = localStorage.getItem("token");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const total = items.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );

  const orderData = {
    items: cartItems,
    totalAmount: total,
  };


  async function handlePayNow() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!res.ok) {
        throw new Error("Payment failed");
      }

      // ✅ Mock payment success
      localStorage.removeItem("cart");
      navigate("/payment-success");

    } catch (err) {
      alert("Payment failed");
    }
  }


  return (
    <div className="page">
      <h2>Checkout</h2>
      <h3>Total: ₹{total}</h3>
      <button className="btn" onClick={handlePayNow}>
        Pay Now (Mock)
      </button>
    </div>
  );
}

export default Checkout;

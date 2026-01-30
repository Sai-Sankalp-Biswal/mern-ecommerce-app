import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div
        className="card"
        style={{
          maxWidth: "450px",
          margin: "60px auto",
          textAlign: "center"
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "10px" }}>✅</div>

        <h2 style={{ marginBottom: "10px" }}>
          Payment Successful
        </h2>

        <p style={{ marginBottom: "20px", color: "#555" }}>
          Your order has been placed successfully.
        </p>

        <button
          className="btn"
          onClick={() => navigate("/orders")}
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}

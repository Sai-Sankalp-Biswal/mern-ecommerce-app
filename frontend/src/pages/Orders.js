import { useEffect, useState } from "react";
import "../styles.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch('${API_BASE_URL}/api/orders/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, [token]);

  const statusClass = status => {
    if (status === "Pending") return "status-badge status-pending";
    if (status === "Completed") return "status-badge status-completed";
    if (status === "Cancelled") return "status-badge status-cancelled";
    return "status-badge";
  };

  return (
    <div className="page">
      <h2 className="page-title">My Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map(order => (
        <div className="card" key={order._id}>
          {/* HEADER */}
          <div className="order-header">
            <span className={statusClass(order.status)}>
              {order.status}
            </span>

            <div className="order-right">
              <div className="order-meta">
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* TOTAL */}
          <div className="price">
            Total Amount: ₹{order.totalAmount}
          </div>
        </div>
      ))}
    </div>
  );
}

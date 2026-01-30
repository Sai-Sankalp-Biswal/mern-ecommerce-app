import { useEffect, useState } from "react";
import API_BASE_URL from "../config";
import "../styles.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/api/orders/my`, {
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

            <div className="order-meta">
              {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>

          {/* ITEMS */}
          <div className="order-items">
            <h4>Items</h4>

            {order.items.map(item => (
              <div key={item.product._id} className="order-item">
                <div>
                  <strong>{item.product.name}</strong>
                </div>
                <div>
                  Price: ₹{item.product.price}
                </div>
                <div>
                  Quantity: {item.quantity}
                </div>
              </div>
            ))}
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

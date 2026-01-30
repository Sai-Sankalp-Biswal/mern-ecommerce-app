import { useEffect, useState, useCallback } from "react";
import "../styles.css";
import API_BASE_URL from "../config";

function AdminOrders() {
  const [activeTab, setActiveTab] = useState("orders");

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = useCallback(async () => {
    const res = await fetch(`${API_BASE_URL}/api/admin/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
  }, [token]);

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    const res = await fetch(`${API_BASE_URL}/api/products`);
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [fetchOrders]);

  /* ================= UPDATE ORDER STATUS ================= */
  async function updateOrderStatus(id, status) {
    await fetch(`${API_BASE_URL}/api/admin/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  }

  /* ================= ADD / UPDATE PRODUCT ================= */
  async function saveProduct() {
    if (!name || !price || !description) {
      return alert("All fields are required");
    }

    const url = editingId
      ? `${API_BASE_URL}/api/admin/products/${editingId}`
      : `${API_BASE_URL}/api/admin/products`;

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        price,
        description
      })
    });

    if (!res.ok) {
      alert("Operation failed");
      return;
    }

    setName("");
    setPrice("");
    setDescription("");
    setEditingId(null);

    fetchProducts();
  }

  /* ================= DELETE PRODUCT ================= */
  async function deleteProduct(id) {
    await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchProducts();
  }

  /* ================= START EDIT ================= */
  function startEdit(product) {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  }

  /* ================= CANCEL EDIT ================= */
  function cancelEdit() {
    setEditingId(null);
    setName("");
    setPrice("");
    setDescription("");
  }

  return (
    <div className="page">
      <h2 className="page-title">Admin Panel</h2>

      {/* TAB BUTTONS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <button className="btn" onClick={() => setActiveTab("orders")}>
          Manage Orders
        </button>
        <button className="btn" onClick={() => setActiveTab("products")}>
          Manage Products
        </button>
      </div>

      {/* ================= MANAGE ORDERS ================= */}
      {activeTab === "orders" && (
        <>
          <h3>Manage Orders</h3>

          <div className="admin-grid">
            {orders.map(order => (
              <div className="card" key={order._id}>
                <p>
                  <strong>User:</strong> {order.user?.email}
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>

                <select
                  value={order.status}
                  onChange={e =>
                    updateOrderStatus(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= MANAGE PRODUCTS ================= */}
      {activeTab === "products" && (
        <>
          <h3>Manage Products</h3>

          <div className="card admin-full">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <button className="btn" onClick={saveProduct}>
              {editingId ? "Update Product" : "Add Product"}
            </button>

            {editingId && (
              <button className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>

          <div className="divider"></div>

          <div className="admin-grid">
            {products.map(product => (
              <div className="card" key={product._id}>
                <h4>{product.name}</h4>
                <p className="price">₹{product.price}</p>
                <p>{product.description}</p>

                <button
                  className="btn"
                  onClick={() => startEdit(product)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminOrders;

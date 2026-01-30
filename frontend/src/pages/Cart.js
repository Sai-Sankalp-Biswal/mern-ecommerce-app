import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = updatedCart => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = id => {
    updateCart(
      cart.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = id => {
    updateCart(
      cart
        .map(item =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const placeOrderSingle = product => {
    navigate("/checkout", {
      state: {
        items: [product],
        total: product.price * product.quantity
      }
    });
  };

  const placeOrderAll = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    navigate("/checkout", {
      state: {
        items: cart,
        total
      }
    });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="page">
      <h2 className="page-title">Cart</h2>

      {/* ✅ EMPTY CART MESSAGE */}
      {cart.length === 0 && (
        <div className="card">
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            Your cart is empty.
          </p>
        </div>
      )}

      {cart.map(item => (
        <div className="card" key={item._id}>
          <h3>{item.name}</h3>

          <div className="price">₹{item.price}</div>

          <div className="qty-controls">
            <button
              className="btn btn-secondary"
              onClick={() => decreaseQty(item._id)}
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              className="btn btn-secondary"
              onClick={() => increaseQty(item._id)}
            >
              +
            </button>
          </div>

          <button
            className="btn"
            onClick={() => placeOrderSingle(item)}
          >
            Place Order
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="card">
          <div className="total">
            Total: ₹{totalAmount}
          </div>

          <button className="btn" onClick={placeOrderAll}>
            Place Order (All)
          </button>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles.css";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(setProducts);
  }, []);

  function addToCart(product) {
    if (!isLoggedIn) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i._id === product._id);

    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  return (
    <div className="page">
      <h2>Products</h2>

      {products.map(product => (
        <div className="card" key={product._id}>
          <h3>{product.name}</h3>
          <p className="price">₹{product.price}</p>

          <button className="btn" onClick={() => navigate(`/product/${product._id}`)}>
            View Details
          </button>

          <button
            className="btn"
            disabled={!isLoggedIn}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;

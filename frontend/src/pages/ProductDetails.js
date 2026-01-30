import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  function addToCart(product) {
    if (!isLoggedIn) {
      alert("Please login first");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i._id === product._id);

    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="page">
      <div className="product-details-card">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>

        <button className="btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;

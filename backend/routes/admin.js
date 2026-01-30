import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ===================== ORDERS ===================== */

// Get all orders (ADMIN)
router.get("/orders", authMiddleware, adminMiddleware, async (req, res) => {
  const orders = await Order.find().populate("user", "email");
  res.json(orders);
});

// UPDATE PRODUCT (ADMIN)
router.put("/products/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const { name, price, description } = req.body;

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { name, price, description },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(updated);
});



/* ===================== PRODUCTS ===================== */

// Add product (ADMIN)
router.post(
  "/products",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
  }
);

// Delete product (ADMIN)
router.delete(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  }
);

export default router;

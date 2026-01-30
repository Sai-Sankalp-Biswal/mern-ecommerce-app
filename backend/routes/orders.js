import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();

/* CREATE ORDER */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    // ✅ FIX: map frontend items → schema format
    const formattedItems = items.map(item => ({
      product: item._id,
      quantity: item.quantity
    }));

    const order = await Order.create({
      user: req.user.id,
      items: formattedItems,
      totalAmount,
      status: "Pending"
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// GET ALL ORDERS (ADMIN)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.product");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;

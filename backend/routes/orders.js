import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();

/* CREATE ORDER */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const formattedItems = items.map(item => ({
      product: item._id,
      name: item.name,
      price: item.price,
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
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


export default router;


// UPDATE ORDER STATUS (ADMIN)
router.put("/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

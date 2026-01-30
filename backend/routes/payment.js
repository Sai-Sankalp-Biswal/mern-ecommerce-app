import express from "express";

const router = express.Router();

router.post("/pay", (req, res) => {
  res.json({ message: "Payment integration coming next" });
});

export default router;

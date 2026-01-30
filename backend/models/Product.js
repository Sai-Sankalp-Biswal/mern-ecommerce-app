import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    // Optional fields (safe defaults)
    description: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

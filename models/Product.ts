import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of this product"],
    },
    price: {
      type: Number,
      required: [true, "Please provide the name of this product"],
    },
    discount: {
      type: Number,
      required: [true, "Please provide the name of this product"],
    },
    brand: {
      type: String,
      required: [true, "Please provide the name of this product"],
    },
    category: {
      type: String,
      required: [true, "Please provide the name of this product"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide the name of this product"],
    },
    star: {
      type: Number,
      required: [true, "Please provide the name of this product"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide the name of this product"],
    },
    properties: [[String, String]],
    about: [String],
    images: [String],
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

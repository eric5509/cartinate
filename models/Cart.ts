import mongoose, { InferSchemaType } from "mongoose";
import { User } from "./User";
import { Product } from "./Product";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: [true, "Provide UserID"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: [true, "Provide ProductID"],
    },
    quantity: {
      type: Number,
      required: [true, "Please input this products quantity"],
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

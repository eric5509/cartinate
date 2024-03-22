"use server";
import { ConnectDB } from "@/config/ConnectDB";
import { Cart } from "@/models/Cart";
import { revalidatePath } from "next/cache";

export const IncreaseItemQty = async (
  user: string,
  product: string,
) => {
  try {
    ConnectDB();
    const productFound = await Cart.findOne({ user, product })
      .populate("product")
      .exec();
    if (!productFound) {
      throw new Error("Something went wrong");
    }
    if (productFound.quantity < productFound.product.stock) {
      productFound.quantity = productFound.quantity + 1;
      await productFound.save();
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
  revalidatePath('/cart')
};

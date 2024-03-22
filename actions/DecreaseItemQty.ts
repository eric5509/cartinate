"use server"
import { ConnectDB } from "@/config/ConnectDB";
import { Cart } from "@/models/Cart";
import { revalidatePath } from "next/cache";

export const DecreaseItemQty = async (
  user: string,
  product: string,
) => {
  const productFound = await Cart.findOne({ user, product });

  try {
    ConnectDB();
    if (!productFound) {
      throw new Error("Something went wrong");
    }
    if (productFound.quantity === 1) {
      const productRemoved = await productFound.deleteOne();
      if (!productRemoved) {
        throw new Error("Something went wrong, Try again");
      }
    } else {
      productFound.quantity = productFound.quantity - 1;
      productFound.save()
    }
  }
  catch (error) {
    throw new Error("Something went wrong");
  }
  revalidatePath('/cart')
};

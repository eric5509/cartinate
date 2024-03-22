"use server";

import { Cart } from "@/models/Cart";
import { revalidatePath } from "next/cache";

export const ChangeItemQty = async (
  user: string,
  product: string,
  quantity: number
) => {
  try {
    const item = await Cart.findOne({ user, product });
    if (item) {
      item.quantity = quantity;
      item.save();
      revalidatePath('/')
    }
  } catch (error) {
    console.log(error)
  }
};

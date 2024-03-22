"use server";
import { ConnectDB } from "@/config/ConnectDB";
import { Cart } from "@/models/Cart";
import { revalidatePath } from "next/cache";

export const RemoveFromCart = async (user: string, product: string) => {
  try {
    ConnectDB();
    if (!user || !product) {
      throw new Error("Something went wrong");
    }
    const productDeleted = await Cart.findOneAndDelete({ user, product });
    if (!productDeleted) {
      throw new Error("Something went wrong");
    }
    revalidatePath("/cart");
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/cart')
};

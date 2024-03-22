"use server";
import { ConnectDB } from "@/config/ConnectDB";
import { Cart } from "@/models/Cart";
import { revalidatePath } from "next/cache";

export const CartTotal = async (user: any) => {
  try {
    ConnectDB();
    const item = await Cart.find({ user }).populate("product").exec();
    const prices = item.map((data) => {
      const discount = data.product.discount;
      const price = data.product.price;
      const percentage = Math.round((discount * price) / 100);
      const main = price - percentage;
      return main * data.quantity;
    });
    const quantities = item.map((data) => {
      return data.quantity;
    });
    const totalPrice = prices.reduce((a, b) => a + b, 0);
    const totalQuantity = quantities.reduce((a, b) => a + b, 0);
    return {
      price: totalPrice as number,
      quantity: totalQuantity as number,
    };
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/cart");
};

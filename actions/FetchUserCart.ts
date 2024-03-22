"use server";
import { ConnectDB } from "@/config/ConnectDB";
import { Cart } from "@/models/Cart";

export const FetchUserCart = async (user: string) => {
  try {
    ConnectDB();
    const products = await Cart.find({ user })
      .populate("product")
      .exec();
    return products;
  } catch (error) {
    console.log(error);
  }
};

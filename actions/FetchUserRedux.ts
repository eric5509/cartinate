"use server";
import { ConnectDB } from "@/config/ConnectDB";
import { Cart } from "@/models/Cart";

export const FetchUserCartRedux = async (user: string) => {
  try {
    ConnectDB();
    const productsDB = await Cart.find({ user }).populate("product").exec();
    const products = productsDB.map((product: any) => {
      return {
        id: product._id.toString(),
        name: product.product.name,
        quantity: product.quantity,
        price: Math.round(
          product.product.price -
            (product.product.discount / 100) * product.product.price
        ),
      };
    });
    return products;
  } catch (error) {
    console.log(error);
  }
};

"use server";
import { ConnectDB } from "@/config/ConnectDB";
import { Product } from "@/models/Product";

export const GetProductDetails = async (id: string) => {
  try {
    ConnectDB();
    const products = await Product.findById(id);
    return products;
  } catch (error) {
    console.log("Something went wrong fetching product details");
  }
};

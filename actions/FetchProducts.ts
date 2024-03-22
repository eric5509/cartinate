"use server"
import { ConnectDB } from "@/config/ConnectDB";
import { Product } from "@/models/Product";

export const FetchProduct = async () => {
  try {
    ConnectDB()
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log('Something went wrong with data fetchcing')
  }
};

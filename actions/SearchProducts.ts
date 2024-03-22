"use server";
import { ConnectDB } from "@/config/ConnectDB";
import { Product } from "@/models/Product";

export const SearchProducts = async (value: string) => {
  try {
    ConnectDB();
    if (value.trim().length > 1) {
      const productss = await Product.find({
        name: { $regex: value, $options: "i" }
      });
      const products = productss.map((product) => {
        const price = Math.round(
          product?.price - (product?.discount / 100) * product?.price
        ).toLocaleString()
        return {
          name: product.name,
          id: product._id.toString(),
          image: product.images[0],
          price,
        };
      });
      return products;
    }
  } catch (error) {
    console.log("Something went wrong");
  }
};

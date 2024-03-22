"use server";
import { ConnectDB } from "@/config/ConnectDB";
import { revalidatePath } from "next/cache";
import { Cart } from "@/models/Cart";

export const AddToCart = async (formData: any) => {
  const { user, product, quantity } = formData;
  try {
    ConnectDB();
    if (!user || !product) {
      throw new Error("Something went wrong");
    }
    const productExists = await Cart.findOne({ user, product });
    if (productExists) {
      productExists.quantity = quantity || productExists.quantity;
      await productExists.save();
      return;
    }
    const productCreated = await Cart.create({
      user,
      product,
      quantity,
    });
    if (!productCreated) {
      throw new Error("Something went wrong");
    }
    return {
      product: productCreated,
    };
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/");
  revalidatePath("/details");
  revalidatePath("/details/*");
  revalidatePath("/details/[id]");
  revalidatePath("/details/[slug]");
};

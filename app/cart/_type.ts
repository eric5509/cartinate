import mongoose from "mongoose";

export type TProduct = {
  user: string;
  quantity: string;
  product: {
    _id: string;
    name: string;
    price: number;
    discount: number;
    brand: string;
    category: string;
    rating: number;
    star: number;
    stock: number;
    properties: [[string, string]];
    images: string[];
  };
};


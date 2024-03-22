'use client'
import ProductCard from "@/components/Cart/ProductCard";
import { variant } from "@/utils/framer";
import { motion } from "framer-motion";
type Props = {
  products: any;
  user: string;
};

export default function Main({ products, user }: Props) {
  return (
    <motion.div variants={variant} initial="initial" animate="animate" className="lg:border-2 rounded border-b-0">
      <div className="flex justify-between p-4 items-center border-b-2">
        <p className="text-xl font-semibold">
          Shopping Cart
        </p>
        <p className="hidden lg:block px-2 text-base font-semibold">
          Price
        </p>
      </div>
      <div className="space-y-5 mt-4">
        {products?.map((product: any, key: number) => (
          <ProductCard product={product} user={user} key={key} />
        ))}
      </div>
    </motion.div>
  );
}

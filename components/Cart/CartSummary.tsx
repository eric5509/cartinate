'use client'
import Link from "next/link";
import { variant } from "@/utils/framer";
import { motion } from "framer-motion";
type Props = {
  total:
     {
        price: number;
        quantity: number;
      }
    | undefined;
};

export default function CartSummary({ total }: Props) {
  return (
    <motion.div variants={variant} initial="initial" animate="animate" className="rounded lg:sticky lg:top-20 h-fit border-2">
      <p className="text-13 font-semibold border-b-2 p-2">
        Subtotal ({total?.quantity} {total && total.quantity <= 1 ? "item" : "items"}):{" "}
        <span className="font-bold text-sm">
          ${total?.price.toLocaleString()}
        </span>
      </p>
      <p className="text-gray-500 text-11 px-2 pt-3 pb-5">
        This is not inclusive of tax & delivery fee
      </p>
      <div className="p-2">
        <Link
          className="bg-yellow-400 text-11 font-semibold rounded-lg shadow p-2 w-full center"
          href={""}
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
}

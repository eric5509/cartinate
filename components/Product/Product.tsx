"use client";
import { variant } from "@/utils/framer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: any;
};

export default function Product({ products }: Props) {
  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      className=""
    >
      <div className="grid container grid-cols-7 gap-5">
        {products?.map((product: any, key: number) => (
          <div className="center flex-col">
            <div className="center h-30" key={key}>
              <Image
                src={product.images[0]}
                height={0}
                width={0}
                alt=""
                unoptimized
                className="h-full w-full object-contain"
              />
            </div>
            <Link
              href={`/details/${product.id}`}
              className="mt-2 font-semibold text-blue-600 hover:underline hover:text-orange-600"
            >
              {product.name}
            </Link>
            <div className="flex mt-1 justify-between items-center w-full">
            <p className="text-red-500 bg-red-200 rounded p-1 text-11">-{product.discount}%</p>
            <p className="font-semibold text-sm">${product.price}</p>

            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

"use client"
import { BsStarFill } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import Link from "next/link";
import { motion } from "framer-motion";
import { variant } from "@/utils/framer";

type Props = {
  product: any;
  price: string;
};

export default function Main({ product, price }: Props) {
  return (
    <motion.main className="" variants={variant} initial="initial" animate="animate">
      <div className="padding">
        <p className="text-15 font-semibold mb-1">{product?.name}</p>
        <Link
          href={""}
          className="mb-2 text-11 text-blue-500 hover:underline hover:text-orange-500"
        >
          Visit <b className="capitalize">{product?.brand}</b> Store
        </Link>
      </div>
      <div className="padding flex mt-2 items-center gap-2">
        <p className="font-semibold">{product?.star}</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((data, key) => (
            <BsStarFill className="text-yellow-500" key={key}/>
          ))}
          <TiArrowSortedDown className="inline cursor-pointer" />
        </div>
        <p className="text-blue-500 cursor-pointer hover:text-orange-600 hover:underline">
          {product?.rating} ratings
        </p>
        <div className="h-4 w-[1px] bg-blue-600"></div>
        <p className="text-blue-500 cursor-pointer hover:text-orange-600 hover:underline">
          Search this page
        </p>
      </div>
      <p className="padding mt-2 lg:border-b px-3 lg:p text-11 pb-1">
        Over 1k bought in the last month
      </p>
      <div className="padding flex items-center gap-2 mt-3">
        <p className="text-lg text-red-600 font-semibold">
          -{product?.discount}%
        </p>
        <p className="text-xl font-bold">
          <sup className="text-xs font-normal mr-1">$</sup>
          {price}
          <sup className="text-xs font-normal ml-1">00</sup>
        </p>
      </div>
      <p className="padding mt-2">
        <b>35$</b> shipping & import fees deposit to Nigeria{" "}
        <span className="text-blue-600 cursor-pointer hover:text-orange-600">
          Delivery <TiArrowSortedDown className="inline text-gray-600" />
        </span>
      </p>
      <div className="padding mt-2 space-y-1 lg:border-b pb-2">
        {product?.properties?.map((data: [string, string], key: number) => (
          <div className="grid grid-cols-[120px_1fr] capitalize" key={key}>
            <p className="font-semibold ">{data[0]}</p>
            <p>{data[1]}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 padding text-sm font-semibold">About this Item</p>
      <div className="padding mt-1 space-y-2">
        {product?.about?.map((data: string, key: number) => (
          <div className="flex gap-1" key={key}>
            <div className="mt-1">
              <div className="h-[5px] w-[5px] rounded-full bg-gray-700"></div>
            </div>
            <p>{data}</p>
          </div>
        ))}
      </div>
    </motion.main>
  );
}

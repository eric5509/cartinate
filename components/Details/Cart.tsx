"use client";
import { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { AddToCart } from "@/actions/AddToCart";
import { CiLocationOn } from "react-icons/ci";
import { links, qty } from "./_data";
import Link from "next/link";
import { motion } from "framer-motion";
import { variant } from "@/utils/framer";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
type Props = {
  price: string;
  productId: string;
  session: any;
};

export default function Cart({ price, productId, session }: Props) {
  const product = productId;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const qtyRef = useRef<any>(null);

  const addToCart = async () => {
    setLoading(true);
    await AddToCart({ user: session?.id, product, quantity });
    setLoading(false);
  };

  const handleQuantityClick = (data: number) => {
    setQuantity(data);
  };

  const handler = (e: any) => {
    if (qtyRef.current.contains(e.target)) {
      if (opened) {
        setOpened(false);
      } else {
        setOpened(true);
      }
    } else {
      setOpened(false);
    }
  };

  
  
  useEffect(() => {
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [opened]);

  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      className="lg:border-2 h-fit p-4 lg:p-3 rounded-md"
    >
      <p className="hidden lg:block text-xl font-bold mb-4">
        <sup className="text-xs font-normal mr-1">$</sup>
        {price}
        <sup className="text-xs font-normal ml-1">00</sup>
      </p>
      <p className="mt-1">
        <b>45$</b> shipping & import fees deposit to Nigeria{" "}
        <span className="text-blue-600 cursor-pointer hover:text-orange-600">
          Delivery <TiArrowSortedDown className="inline text-gray-600" />
        </span>
      </p>
      <p className="mt-1">
        Delivery <strong>Tuesday, February</strong> Order within{" "}
        <span className="text-green-600">22 hrs 55 mins</span>
      </p>
      <p className="mt-2">
        Or fastest deliver <strong>Tuesday, February</strong>{" "}
      </p>
      <p className="mt-2">
        <CiLocationOn className="inline stroke-1 mr-1" />
        Deliver to Nigeria
      </p>
      <p className="text-green-700 mt-3 mb-3 text-lg">In Stock</p>
      <div
        ref={qtyRef}
        className={`flex justify-between relative cursor-pointer text-11 items-center bg-gray-200 p-2 rounded-md border border-gray-400 shadow `}
      >
        <p>
          Quantity: <span>{quantity}</span>
        </p>
        <TiArrowSortedDown className="text-xs" />
        <div
          className={` ${
            opened ? "h-60 overflow-y-auto border" : "h-0 overflow-hidden "
          } duration-300 w-full absolute bg-white bottom-0 left-0  rounded-md shadow-md`}
        >
          {qty.map((data, key) => (
            <p
              key={key}
              className="p-2 hover:bg-gray-200"
              onClick={() => handleQuantityClick(data)}
            >
              {data}
            </p>
          ))}
        </div>
      </div>
      {session ? (
        <div>
          <button
            type="submit"
            onClick={addToCart}
            className={`bg-yellow-500 active:scale-95 h-8 duration-300 center font-semibold rounded-full p-2 w-full mt-4`}
          >
            {loading ? <div className="loader3"></div> : "Add to Cart"}
          </button>
          <Link
            href={""}
            className="bg-rose-500 center font-semibold rounded-full p-2 w-full mt-2"
          >
            Buy Now
          </Link>
        </div>
      ) : (
        <div className="">
          <Link
            href={"/signin"}
            className="bg-yellow-400 center font-semibold rounded-full p-2 w-full mt-2"
          >
            Add to Cart
          </Link>
          <Link
            href={""}
            className="bg-rose-500 center font-semibold rounded-full p-2 w-full mt-2"
          >
            Buy Now
          </Link>
        </div>
      )}
      <div className="hidden lg:block space-y-2 text-11 mt-3">
        {links.map((data, key) => (
          <div className="grid grid-cols-[70px_1fr]" key={key}>
            <p>{data[0]}</p>
            <p
              className={`${
                key >= 2
                  ? "text-blue-500 cursor-pointer hover:underline hover:text-orange-600"
                  : ""
              }`}
            >
              {data[1]}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

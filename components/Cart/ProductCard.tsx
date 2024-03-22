"use client";
import { DecreaseItemQty } from "@/actions/DecreaseItemQty";
import { IncreaseItemQty } from "@/actions/IncreaseItemQty";
import { RemoveFromCart } from "@/actions/RemoveFromCart";
import { BiMinus, BiPlus } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: any;
  user: string;
};

export default function ProductCard({ product, user }: Props) {
  const price = Math.round(
    product.price - (product.discount / 100) * product.price
  ).toLocaleString();
  const id = product.id
  const [addPending, setAddPending] = useState(false);
  const [subPending, setSubPending] = useState(false);

  const increaseItemQty = async (user: string, product: string) => {
    if (!addPending && !subPending) {
      setAddPending(true);
      await IncreaseItemQty(user, product);
      setAddPending(false);
    }
  };
  const decreaseItemQty = async (user: string, product: string) => {
    if (!subPending && !addPending) {
      setSubPending(true);
      await DecreaseItemQty(user, product);
      setSubPending(false);
    }
  };

  return (
    <div className="space-y-1 border-b-2 pb-5">
      <div className="grid grid-cols-[auto_1fr] gap-1">
        <div className="h-28 w-32 lg:w-40 rounded-md">
          <Image
            src={product.images[0]}
            alt=""
            height={0}
            width={0}
            unoptimized
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex p-2 flex-col justify-between">
          <div className="flex flex-col lg:flex-row text-13 gap-3 justify-between">
            <Link
              href={`/details/${product.id}`}
              className="font-semibold hover:underline hover:text-orange-500"
            >
              {product.name}
            </Link>
            <p className="font-bold text-15">${price}</p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="w-24 h-6 rounded-full gap-2 grid grid-cols-3">
              <button
                onClick={() => decreaseItemQty(user, product.id)}
                className="center border rounded"
                aria-disabled={subPending}
              >
                {subPending ? (
                  <span className="loader"></span>
                ) : product.quantity === 1 ? (
                  <BsTrash />
                ) : (
                  <BiMinus />
                )}
              </button>
              <div className="center border rounded">
                <p>{product.quantity}</p>
              </div>
              <button
                onClick={() => increaseItemQty(user, product.id)}
                className="center border rounded"
                aria-disabled={addPending}
              >
                {addPending ? <span className="loader"></span> : <BiPlus />}
              </button>
            </div>
            <div
              onClick={() => RemoveFromCart(user, product.id)}
              className="flex text-13 cursor-pointer hover:text-[red] items-center gap-2"
            >
              <BsTrash />
              <p>Remove</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 lg:hidden grid h-8 grid-cols-[150px_1fr] gap-1">
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => decreaseItemQty(user, product.id)}
            className="center border rounded"
            aria-disabled={subPending}
          >
            {subPending ? (
              <span className="loader"></span>
            ) : product.quantity === 1 ? (
              <BsTrash />
            ) : (
              <BiMinus />
            )}
          </button>
          <div className="border-2 rounded-md center">
            <p>{product.quantity}</p>
          </div>
          <button
            onClick={() => increaseItemQty(user, product.id)}
            className="center border rounded"
            aria-disabled={addPending}
          >
            {addPending ? <span className="loader"></span> : <BiPlus />}
          </button>
        </div>
        <button
          onClick={() => RemoveFromCart(user, product.id)}
          className="lg:hidden h-8 w-full rounded-md border-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

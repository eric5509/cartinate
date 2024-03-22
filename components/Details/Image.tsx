"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { variant } from "@/utils/framer";

type Props = {
  images: string[];
};

export default function Images({ images }: Props) {
  const [active, setActive] = useState(0);
  return (
    <motion.div variants={variant} initial="initial" animate="animate" className="lg:sticky lg:top-16">
      <div className="flex gap-3  w-full lg:w-fit justify-center lg:justify-start">
        <div className="hidden lg:block space-y-2">
          {images?.length > 1 &&
            images?.map((data, key) => (
              <div
                className={`h-14 w-14 p-1 rounded cursor-pointer border-[2px] duration-300 ${
                  key === active ? "border-orange-400" : "border-gray-200"
                }`}
                onClick={() => setActive(key)}
                key={key}
              >
                <Image
                  src={data}
                  alt=""
                  height={0}
                  width={0}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
        </div>
        <div className="h-fit w-fit rounded">
          <Image
            src={images && images[active]}
            alt=""
            height={0}
            width={0}
            unoptimized
            className="h-80 w-72 object-contain"
          />
        </div>
      </div>
      {images?.length > 1 && (
        <div className="flex lg:hidden my-2 justify-center items-center gap-2">
          {images?.map((data, key) => (
            <div
              onClick={() => setActive(key)}
              className={`h-[14px] w-[14px] shadow  duration-500 cursor-pointer ${
                active === key ? "bg-red-500" : "bg-white"
              } rounded-full border`}
              key={key}
            ></div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

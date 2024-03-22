"use client";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { variant } from "@/utils/framer";
import Img1 from "@/public/amazon1.jpg";
import Img2 from "@/public/amazon2.jpg";
import Img3 from "@/public/amazon3.jpg";
import Img4 from "@/public/amazon4.jpg";
import Img5 from "@/public/amazon5.jpg";
import Img6 from "@/public/amazon6.jpg";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Main() {
  const images = [Img2, Img1, Img3, Img4, Img5, Img6];
  const [active, setActive] = useState(0);
  const Forward = () => {
    if (active === 5) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };
  const Backward = () => {
    if (active === 0) {
      setActive(5);
    } else {
      setActive(active - 1);
    }
  };
  const categories = [
    [
      "Phones & Tablets",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/phones-tablet.jpg",
    ],
    [
      "Computing Deals",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/computing.jpg",
    ],
    [
      "Televisions",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/televisions.jpg",
    ],
    [
      "Refrigerators",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/refrigerator.jpg",
    ],
    [
      "Best Deals",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/global.jpg",
    ],
    [
      "Generators",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/generators.jpg",
    ],
    [
      "Mobile Accessories",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/mobile-accessories.jpg",
    ],
    [
      "Groceries",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/groceries.jpg",
    ],
    [
      "Men's Sneakers",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/sneakers.jpg",
    ],
    [
      "Clearance Sales",
      "https://ng.jumia.is/cms/0-5-TechWeek/2024/Category-Freelink/Homepage-thumbnails/clearance.jpg",
    ],
  ];

  return (
    <motion.div variants={variant} initial="initial" animate="animate">
      <div className="min-h-screen flex flex-col relative">
        {images.map((data, key) => (
          <Image
            key={key}
            src={images[key]}
            alt=""
            height={0}
            width={0}
            className={`h-full object-cover absolute duration-500 w-full ${
              active === key ? "visible opacity-100" : "invisible opacity-0"
            }`}
          />
        ))}
        <div className="hidden lg:flex text-7xl z-30 py-2 container justify-between p- relative">
          <div
            className="border-2 border-gray-600 hover:border-gray-800 duration-300 hover:text-gray-800 text-gray-600 cursor-pointer h-52 w-16 center rounded-md"
            onClick={Backward}
          >
            <BsChevronLeft />
          </div>
          <div
            className="border-2 border-gray-600 hover:border-gray-800 duration-300 hover:text-gray-800 text-gray-600 cursor-pointer h-52 w-16 center rounded-md"
            onClick={Forward}
          >
            <BsChevronRight />
          </div>
        </div>
        <div className="hidden lg:block flex-1 z-30 relative ">
          <div className="container h-full rounded-md py-3 gap-4 grid grid-cols-5 grid-rows-2 w-full">
            {categories.map((data, key) => (
              <div className="text-center cursor-pointer gap-1 h-full flex flex-col">
                <div className="rounded border-2 overflow-hidden h-full">
                  <Image alt="" height={0} width={0} src={`${data[1]}`} unoptimized className="h-40 w-full object-cover"/>
                </div>
                <p className="font-semibold text-13">{data[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { SearchProducts } from "@/actions/SearchProducts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Params = {
  params: {
    query: string;
  };
};

export default async function page({ params }: Params) {
  const { query } = params;
  const products = await SearchProducts(query);

  return (
    <div>
      <div className="grid container grid-cols-7 gap-5">
        {products?.map((product: any, key: number) => (
          <div className="center flex-col">
            <div className="center h-30" key={key}>
              <Image
                src={product.image}
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
          </div>
        ))}
      </div>
    </div>
  );
}

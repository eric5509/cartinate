import { GetProductDetails } from "@/actions/GetProductDetails";
import { GetSession } from "@/actions/GetSession";
import Cart from "@/components/Details/Cart";
import Image from "@/components/Details/Image";
import Main from "@/components/Details/Main";

type Params = {
  params: {
    id: string;
  };
};

export default async function DetailsPage({ params }: Params) {
  const { id } = params;
  const session = await GetSession();
  const productDetails = await GetProductDetails(id);
  const product = {
    id: productDetails?._id.toString(),
    name: productDetails?.name,
    price: productDetails?.price,
    discount: productDetails?.discount,
    brand: productDetails?.brand,
    category: productDetails?.category,
    rating: productDetails?.rating,
    star: productDetails?.star,
    stock: productDetails?.stock,
    properties: productDetails?.properties,
    about: productDetails?.about,
    images: productDetails?.images,
  };

  const price = Math.round(
    product?.price - (product?.discount / 100) * product?.price
  ).toLocaleString();
  return (
    <main className="grid gap-3 lg:gap-7 lg:px-3 xl:px-0 container grid-cols-1 lg:grid-cols-[auto_1fr_250px]">
      <div className="lg:sticky lg:top-16">
        <Image images={product?.images} />
      </div>
      <Main product={product} price={price} />
      <Cart
        price={price}
        productId={product?.id}
        session={session}
      />
    </main>
  );
}

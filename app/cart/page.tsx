import CartSummary from "@/components/Cart/CartSummary";
import { FetchUserCart } from "@/actions/FetchUserCart";
import { GetSession } from "@/actions/GetSession";
import { CartTotal } from "@/actions/CartTotal";
import { redirect } from "next/navigation";
import Main from "@/components/Cart/Main";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";

type TotalType =
  | {
      price: number;
      quantity: number;
    }
  | undefined;

export default async function CartPage() {
  const session: any = await GetSession();
  const total: TotalType = await CartTotal(session?.id);
  if (!session?.id) {
    redirect("/signin");
  }
  const cart = await FetchUserCart(session?.id);
  const products = cart?.map((data: any) => {
    return {
      user: data.user.toString(),
      quantity: data.quantity,
      name: data.product.name,
      id: data.product._id.toString(),
      price: data.product.price,
      discount: data.product.discount,
      brand: data.product.brand,
      category: data.product.category,
      rating: data.product.rating,
      star: data.product.star,
      stock: data.product.stock,
      properties: data.product.properties,
      about: data.product.about,
      images: data.product.images,
    };
  });
  console.log(products);
  const len: number | undefined = products?.length;
  return (
    <main className="">
      {len! > 0 ? (
        <div className="grid p-3 container gap-5 grid-cols-1 lg:grid-cols-[1fr_250px] mt-3">
          <Main products={products} user={session.id} />
          <CartSummary total={total} />
        </div>
      ) : (
        <div className="container h-[270px] flex-col gap-5 font-semibold text-3xl center text-center">
          <p>Your Cart is Empty</p>
          <BsCart2 className="text-6xl" />
          <Link
            href={"/"}
            className="text-sm font-semibold p-3 rounded-md shadow-md bg-yellow-400 border-2 border-black "
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </main>
  );
}

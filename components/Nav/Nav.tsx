"use client";
import { FetchUserCartRedux } from "@/actions/FetchUserRedux";
import { SearchProducts } from "@/actions/SearchProducts";
import { usePathname, useRouter } from "next/navigation";
import { DeleteSession } from "@/actions/DeleteSession";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { BsCart3, BsSearch } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiLocationOn } from "react-icons/ci";
import { setCart } from "@/slice/cartSlice";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

type Props = {
  session: any;
  total:
    | {
        price: number;
        quantity: number;
      }
    | undefined;
};
export default function Nav({ total, session }: Props) {
  const links = ["/signin", "/signup", "/school", "/test"];
  const firstName = session?.fullname.split(" ")[0] || "";
  const cart = useSelector((state: any) => state.cart);
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<any>(null);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const addProductsToRedux = async () => {
      const products = await FetchUserCartRedux(session?.id);
      dispatch(setCart(products));
    };
    
    addProductsToRedux();
    console.log(cart);
  }, []);

  const Signin = () => {
    if (!session?.id) {
      router.push("/signin");
    }
  };

  const Search = async () => {
    setLoading(true);
    const prod: any = await SearchProducts(search);
    setProducts(prod);
    setLoading(false);
  };

  const Logout = async () => {
    await DeleteSession();
    router.push("/");
  };

  const handler = (e: any) => {
    if (searchRef.current.contains(e.target)) {
      setOpened(true);
    } else {
      setOpened(false);
      setProducts([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [opened]);
  useEffect(() => {
    if (search.length > 1) {
      Search();
    } else {
      setLoading(false);
      setProducts([]);
    }
  }, [search]);
  return (
    <main>
      {!links.includes(pathname) && (
        <div className={`relative h-16 z-50 ${pathname !== "/" && "mb-3"}`}>
          <div className="flex gap-5 justify-between fixed top-0 left-0 w-screen shadow-md border-b-2 items-center px-5 h-16 text-white bg-[#04002b]">
            <div className="flex items-center gap-2">
              <FaBars className="xl:hidden text-lg" />
              <Link
                href={"/"}
                className="font-bold text-lg xl:text-2xl border border-transparent hover:border-gray-300 duration-300 cursor-pointer h-12 px-2 rounded center"
              >
                Cartinate
              </Link>
            </div>
            <div className="hidden xl:flex border border-transparent hover:border-gray-300 duration-300 cursor-pointer h-11 px-2 rounded items-center justify-center gap-[2px]">
              <CiLocationOn className="mt-3 text-base stroke-1" />
              <div className="leading-none">
                <p className="text-11 mb-[2px]">Deliver to</p>
                <p className="font-semibold text-13">Nigeria</p>
              </div>
            </div>
            <div className="flex-1 border-white hidden xl:flex h-12 rounded border-2">
              <p className="center px-2 gap-4 h-full text-black bg-gray-200 cursor-pointer w-fit">
                All <TiArrowSortedDown className="inline" />
              </p>
              <div className="flex-1 flex relative" ref={searchRef}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-gray-600 font-semibold outline-none text-13 px-2"
                  placeholder="Search Cartinate..."
                />
                {opened && (
                  <div className="h-60 overflow-y-auto w-full border-2 shadow-md bg-white rounded-b-md border-t-none text-black top-full absolute left-0">
                    {!loading ? (
                      <div className="">
                        {products?.map((product: any, key: number) => (
                          <div
                            className="flex cursor-pointer gap-2 p-2 hover:bg-gray-100 items-center"
                            key={key}
                            onClick={() => {
                              router.push(`/details/${product.id}`);
                              setSearch("");
                              setOpened(false);
                            }}
                          >
                            <Image
                              src={product.image}
                              alt=""
                              height={0}
                              width={0}
                              unoptimized
                              className="h-8 w-8 object-contain"
                            />
                            <p className="">{product?.name}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full w-full center">
                        <div className="loader2"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Link
                href={`/search/${search}`}
                className="h-full w-12 rounded-r center text-base"
              >
                <BsSearch />
              </Link>
            </div>
            <div
              className="leading-4 h-11 border border-transparent hover:border-gray-300 duration-300 cursor-pointer hidden xl:flex justify-center group relative px-2 rounded flex-col"
              onClick={Signin}
            >
              <p className="mb-[2px]">
                Hello{firstName !== "" ? "" : ","}{" "}
                <span
                  className={`${firstName != "" && "font-semibold capitalize"}`}
                >
                  {firstName != "" ? firstName : "Sign in"}
                </span>{" "}
              </p>
              <p className="font-semibold text-13">
                Account & Lists
                <TiArrowSortedDown className="inline" />
              </p>
              {session && (
                <div
                  onClick={Logout}
                  className="absolute group-hover:h-10 top-full left-0 h-0 w-full rounded-md shadow-md active:scale-95 duration-300 center mt-1 overflow-hidden border-transparent group-hover:border-red-500 bg-transparent border-2 border-red-500 text-red-500 font-semibold group-hover:bg-white"
                >
                  Sign Out
                </div>
              )}
            </div>
            <div className="leading-4 h-11 border border-transparent hover:border-gray-300 duration-300 cursor-pointer hidden xl:flex justify-center px-2 rounded flex-col">
              <p className="mb-[2px]">Returns</p>
              <p className="font-semibold text-13">& Orders</p>
            </div>
            <Link
              href={"/cart"}
              className="items-center gap-1 h-11 border border-transparent hover:border-gray-300 duration-300 cursor-pointer flex justify-center px-2 rounded"
            >
              <div className="relative">
                <BsCart3 className="text-2xl" />
                {total && total.quantity > 0 && (
                  <div className="h-5 w-5 center bg-[red] absolute -top-2 -right-2 rounded-full border-2 border-white">
                    <p className="text-10 font-semibold">{total?.quantity}</p>
                  </div>
                )}
              </div>
              <p className="hidden xl:block font-semibold mt-2 text-13">Cart</p>
            </Link>
          </div>
        </div>
      )}
      {opened && (
        <div className="h-screen z-40 w-screen transBlack fixed top-0 left-0"></div>
      )}
    </main>
  );
}

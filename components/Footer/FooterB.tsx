import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { links } from "./_data";
import Link from "next/link";

export default function FooterB() {
  return (
    <div className="bg-cyan-950">
      <Link
        href={"/"}
        className="py-3 block text-sm font-semibold cursor-pointer bg-cyan-900 text-center text-white"
      >
        Back to top
      </Link>
      <div className="pt-5 px-4 lg:px-0 pb-10">
        <div className="container gap-2 lg:gap-10 text-white grid grid-cols-1 lg:grid-cols-[1fr_4fr]">
          <div className="hidden lg:flex justify-start">
            <p className="font-bold text-3xl cursor-pointer h-12 -translate-y-3 rounded center ">
              Cartinate
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-5 gap-5">
            {links.map((link, key) => (
              <div className="" key={key}>
                <div className="">
                  <p className="font-bold text-sm mb-1">{link.title}</p>
                  {link.links.map((link2, key2) => (
                    <p
                      key={key2}
                      className="text-13 mb-1 cursor-pointer hover:text-orange-600 hover:underline w-fit"
                    >
                      {link2}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex border-t-2 py-6 text-white">
        <div className="container flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5">
          <div className="flex gap-4">
            <p className="cursor-pointer hover:text-orange-600 hover:underline">
              Data Selling
            </p>
            <p className="cursor-pointer hover:text-orange-600 hover:underline">
              Privacy Policy
            </p>
            <p className="cursor-pointer hover:text-orange-600 hover:underline">
              Terms & Conditions
            </p>
          </div>
          <div className="flex gap-8 text-base">
            <BsFacebook className=" cursor-pointer hover:text-blue-500" />
            <BsInstagram className=" cursor-pointer hover:text-rose-500" />
            <BsTwitter className=" cursor-pointer hover:text-blue-600" />
          </div>
          <p className="text-gray-400">@1996 - 2024 - All rights reserves.</p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { usePathname } from "next/navigation";
import FooterA from "./FooterA";
import FooterB from "./FooterB";

export default function Footer() {
  const pathname = usePathname();
  const links = ["/signin", "/signup", "/school", '/test'];

  return (
    <div className="mt-40">
      {!links.includes(pathname) && (
        <div className="">
          <FooterA />
          <FooterB />
        </div>
      )}
    </div>
  );
}

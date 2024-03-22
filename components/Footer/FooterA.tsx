import Link from "next/link";

export default function FooterA() {
  return (
    <div className="center flex-col text-center border-y-2 py-7 mt-5 gap-2">
      <p className="text-13 font-semibold">See personalized recommendations</p>
      <Link
        href={"/signin"}
        className="w-56 cursor-pointer shadow-md py-2 rounded-md border-2 border-yellow-600 center bg-yellow-500 font-semibold"
      >
        Sign in
      </Link>
      <p>
        New customer?{" "}
        <Link href={"/signup"} className="text-blue-500">
          Start here
        </Link>
      </p>
    </div>
  );
}

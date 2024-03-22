"use client";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Signin } from "@/actions/Signin";
import { variant } from "@/utils/framer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Main() {
  const [isPassword, setIsPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  
  const [error, setError] = useState<any>(
    {
      password: '',
      email: '',
      others: ''
    }
  );
  const Submit = async () => {
    if (!email || !password) {
      return setError({
        email: email.trim().length > 0 ? "" : "Please fill in your email",
        password:
          password.trim().length > 0 ? "" : "Please fill in your password",
        others: "",
      });
    }
    setLoading(true);
    const response = await Signin({ email, password });
    setLoading(false);
    if (response?.status !== 200) {
      return setError(response?.error);
    }
    router.push("/");
  };

  const changePassword = (e: any) => {
    setPassword(e.target.value);
    setError({ ...error, password: "", others: "" });
  };

  const changeEmail = (e: any) => {
    setEmail(e.target.value);
    setError({ ...error, email: "", others: "" });
  };

  return (
    <motion.div variants={variant} initial="initial" animate="animate" className="">
      <div className="w-full sm:w-80 sm:border rounded-md p-4">
        <p className="text-xl font-semibold mb-2">Sign in</p>
        <div className="mb-3">
          <div className="">
            <p className="font-bold">Email or phone number</p>
            <input
              type="text"
              value={email}
              onChange={changeEmail}
              className={`input ${
                error?.email === "" ? "bg-white border-gray-200 focus:border-blue-600" : "border-red-500 bg-red-200"
              }`}
            />
            {error?.email != "" && (
              <p className="text-red-500">{error?.email}</p>
            )}
          </div>
          <div className="mt-3 relative">
            <p className="font-bold">Password</p>
            <input
              type={isPassword ? "password" : "text"}
              value={password}
              onChange={changePassword}
              className={`input ${
                error?.password === "" ? "bg-white border-gray-200 focus:border-blue-600" : "border-red-500 bg-red-200"
              }`}
            />
            {!isPassword ? (
              <BsEyeSlash
                className="absolute cursor-pointer top-[26px] text-base right-2"
                onClick={() => setIsPassword(!isPassword)}
              />
            ) : (
              <BsEye
                className="absolute cursor-pointer top-[26px] text-base right-2"
                onClick={() => setIsPassword(!isPassword)}
              />
            )}
            {error?.password != "" && (
              <p className="text-red-500">{error?.password}</p>
            )}
            {error?.others != "" && (
              <p className="text-red-500">{error?.others}</p>
            )}
          </div>
          <div
            onClick={Submit}
            className={`h-10 center mb-3 mt-3 rounded-md duration-300 w-full ${loading ? 'bg-gray-200' : 'active:scale-95 cursor-pointer bg-yellow-400 shadow hover:bg-yellow-300'}`}
          >
            {loading ? <span className="loader1"></span> : "Continue"}
          </div>
        </div>
        <p>
          By continuing, you agree to Amazon's{" "}
          <span className="text-blue-500 cursor-pointer hover:text-orange-500 hover:underline">
            Conditions of Use
          </span>{" "}
          and{" "}
          <span className="text-blue-500 cursor-pointer hover:text-orange-500 hover:underline">
            Privacy Notice
          </span>
        </p>
        <p className="text-blue-500 mt-2 font-semibold cursor-pointer">
          <TiArrowSortedDown className="-rotate-90 text-black inline mr-1" />
          Need help
        </p>
        <div className="h-[1px] my-4 w-full bg-gray-100"></div>
        <p className="font-semibold mt-2">Buying for work</p>
        <p className="text-blue-500 mt-1 font-semibold cursor-pointer">
          Shop on Amazon Business
        </p>
      </div>
      <div className="flex mt-3 items-center gap-2 px-4 sm:px-0">
        <div className="h-[1px] bg-gray-200 flex-1"></div>
        <p>New on Amazon?</p>
        <div className="h-[1px] bg-gray-200 flex-1"></div>
      </div>
      <Link href={'/signup'} className="px-4 sm:px-0 duration-300 active:scale-95">
        <p className="border rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-500 hover:font-semibold duration-300 hover:underline hover:text-blue-500 shadow w-full center py-2 px-3 mt-3">
          Create your Amazon account
        </p>
      </Link>
    </motion.div>
  );
}

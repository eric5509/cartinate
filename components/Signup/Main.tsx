"use client";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Signup } from "@/actions/Signup";
import { motion } from "framer-motion";
import { useState } from "react";
import { variant } from "@/utils/framer";
import Link from "next/link";

type TError = {
  fullname?: string
  email?: string
  password?: string
  confirmPassword?: string
  others?: string
} | undefined

export default function Main() {
  const [isPassword, setIsPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<TError>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    others: "",
  });

  const changeFullname = (e: any) => {
    setValues({ ...values, fullname: e.target.value });
    setError({ ...error, fullname: "" });
  };
  const changeEmail = (e: any) => {
    setValues({ ...values, email: e.target.value });
    setError({ ...error, email: "" });
  };
  const changePassword = (e: any) => {
    setValues({ ...values, password: e.target.value });
    setError({ ...error, password: "" });
  };
  const changeConfirmPassword = (e: any) => {
    setValues({ ...values, confirmPassword: e.target.value });
    setError({ ...error, confirmPassword: "" });
  };
  const Register = async () => {
    if (
      !values.fullname ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setError({
        fullname:
          values.fullname.trim().length > 0
            ? ""
            : "Please fill in your fullname",
        email:
          values.email.trim().length > 0
            ? ""
            : "Please fill in your email address",
        password:
          values.password.trim().length > 0
            ? ""
            : "Please fill in your password address",
        confirmPassword:
          values.confirmPassword.trim().length > 0
            ? ""
            : "Please confirm your password",
        others: "",
      });
      return;
    }

    if (values.password.length < 8 || values.confirmPassword.length < 8) {
      setError({
        fullname: "",
        email: "",
        password:
          values.password.length < 8
            ? "Password cannot be less than 8 characters"
            : "",
        confirmPassword:
          values.confirmPassword.length < 8
            ? "Password cannot be less than 8 characters"
            : "",
        others: "",
      });
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError({
        fullname: "",
        email: "",
        password: "Passwords don't match",
        confirmPassword: "Passwords don't match",
        others: "",
      });
      return;
    }
    const response = await Signup({
      fullname: values?.fullname,
      email: values?.email,
      password: values?.password,
      confirmPassword: values?.confirmPassword,
    });
    setLoading(true);

    if (response.status !== 200) {
      setError(response?.error);
      setLoading(false);
      return;
    }
    router.push("/");
  };

  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      className=""
    >
      <div className="w-full sm:w-80 sm:border rounded-md p-4">
        <p className="text-xl font-semibold mb-2">Create Account</p>
        <div className="mb-3">
          <p className="font-bold">Fullname</p>
          <input
            type="text"
            className={`input ${
              error?.fullname === ""
                ? "bg-white border-gray-200 focus:border-blue-600"
                : "border-red-500 bg-red-200"
            }`}
            onChange={changeFullname}
          />
          {error?.fullname != "" && (
            <p className="text-red-500">{error?.fullname}</p>
          )}
        </div>
        <div className="mb-3">
          <p className="font-bold">Email or phone number</p>
          <input
            type="text"
            className={`input ${
              error?.email === ""
                ? "bg-white border-gray-200 focus:border-blue-600"
                : "border-red-500 bg-red-200"
            }`}
            onChange={changeEmail}
          />
          {error?.email != "" && <p className="text-red-500">{error?.email}</p>}
        </div>
        <div className="mb-3 relative">
          <p className="font-bold">Password</p>
          <input
            className={`input ${
              error?.password === ""
                ? "bg-white border-gray-200 focus:border-blue-600"
                : "border-red-500 bg-red-200"
            }`}
            type={isPassword ? "password" : "text"}
            onChange={changePassword}
          />
          {!isPassword ? (
            <BsEyeSlash
              className="absolute cursor-pointer top-7 text-base right-2"
              onClick={() => setIsPassword(!isPassword)}
            />
          ) : (
            <BsEye
              className="absolute cursor-pointer top-7 text-base right-2"
              onClick={() => setIsPassword(!isPassword)}
            />
          )}
          {error?.password != "" && (
            <p className="text-red-500">{error?.password}</p>
          )}
        </div>
        <div className="mb-3 relative">
          <p className="font-bold">Re-enter password</p>
          <input
            type={isPassword ? "password" : "text"}
            className={`input ${
              error?.confirmPassword === ""
                ? "bg-white border-gray-200 focus:border-blue-600"
                : "border-red-500 bg-red-200"
            }`}
            onChange={changeConfirmPassword}
          />

          {error?.confirmPassword != "" && (
            <p className="text-red-500">{error?.confirmPassword}</p>
          )}
          {error?.others != "" && (
            <p className="text-red-500">{error?.others}</p>
          )}
        </div>
        <button
          onClick={Register}
          className="h-10 center mb-3 mt-3 rounded-md duration-300 active:scale-95 hover:bg-yellow-300 w-full bg-yellow-400 shadow"
        >
          {loading ? <span className="loader1"></span> : "Continue"}
        </button>
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
        <div className="h-[1px] my-4 w-full bg-gray-100"></div>
        <p className="font-semibold mt-2">Buying for work</p>
        <p className="text-blue-500 mt-1 font-semibold cursor-pointer">
          Create a free business account
        </p>
        <div className="h-[1px] my-2 w-full bg-gray-100"></div>
        <p>
          Already have an account?{" "}
          <Link
            href={"/signin"}
            className="text-blue-600 cursor-pointer hover:text-orange-500"
          >
            Sign in{" "}
            <TiArrowSortedDown className="inline -translate-x-1 -rotate-90" />
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

"use server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ConnectDB } from "@/config/ConnectDB";
import { User } from "@/models/User";
import { cookies } from "next/headers";

export const Signin = async (formData: any) => {
  const { email, password } = formData;
  try {
    ConnectDB();
    if (!email || !password) {
      return {
        status: 400,
        error: {
          email: email.trim().length > 0 ? "" : "Please fill in your email",
          password:
            password.trim().length > 0 ? "" : "Please fill in your password",
          others: "",
        },
      };
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return {
        status: 402,
        error: {
          email: "",
          password: "",
          others: "Invalid Credentials",
        },
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        status: 402,
        error: {
          email: "",
          password: "",
          others: "Invalid Credentials",
        },
      };
    }
    const payload = {
      id: user._id.toString(),
      fullname: user.fullname,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "30d" });
    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2592000
    });
    return {
      status: 200,
      token,
    };
  } catch (error) {
    console.log("Something went wrong");
    return {
      status: 402,
      error: {
        email: "",
        password: "",
        others: "Something went wrong",
      },
    };
  }
};

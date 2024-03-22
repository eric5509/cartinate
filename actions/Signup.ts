"use server";
import { ConnectDB } from "@/config/ConnectDB";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Signup = async (formData: any) => {
  const { fullname, email, password, confirmPassword } = formData;

  try {
    ConnectDB();
    if (!fullname || !email || !password || !confirmPassword) {
      return {
        status: 400,
        error: {
          fullname:
            fullname.trim().length > 0 ? "" : "Please fill in your fullname",
          email: email.trim().length > 0 ? "" : "Please fill in your email",
          password:
            password.trim().length > 0 ? "" : "Please fill in your password",
          confirmPassword:
            confirmPassword.trim().length > 0
              ? ""
              : "Please fill in your confirmPassword",
          others: "",
        },
      };
    }
    if (password.trim().length < 8 || confirmPassword.trim().length < 8) {
      return {
        status: 400,
        error: {
          fullname: "",
          email: "",
          password:
            password.trim().length < 8
              ? "Password cannot be less than 8 character"
              : "",
          confirmPassword:
            confirmPassword.trim().length < 8
              ? "Password cannot be less than 8 character"
              : "",
          others: "",
        },
      };
    }
    if (password !== confirmPassword) {
      return {
        status: 400,
        error: {
          fullname: "",
          email: "",
          password: "Passwords don't match",
          confirmPassword: "Passwords don't match",
          others: "",
        },
      };
    }
    const user = await User.findOne({ email });
    if (user) {
      return {
        status: 400,
        error: {
          fullname: "",
          email: "This email is already attached to an account",
          password: "",
          confirmPassword: "",
          others: "",
        },
      };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userCreated = await User.create({
      fullname: fullname.toLowerCase(),
      email: email.toLowerCase(),
      password: hashPassword,
    });
    if (!userCreated) {
      return {
        status: 400,
        error: {
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
          others: "Something went wrong",
        },
      };
    }
    const payload = {
      id: userCreated._id.toString(),
      fullname: userCreated.fullname,
      email: userCreated.email,
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

    };
  } catch (error) {
    console.log("Something went wrong");
    return {
      status: 400,
      error: {
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        others: "Something went wrong",
      },
    };
  }
};

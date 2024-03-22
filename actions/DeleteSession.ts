"use server";
import { cookies } from "next/headers";

export const DeleteSession = async () => {
  cookies().delete("session");
};

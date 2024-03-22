"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";


export const GetSession = async () => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const decoded = jwt.verify(
    session,
    process.env.JWT_SECRET as string
  );
  if (!decoded) return null;
  return decoded;
};

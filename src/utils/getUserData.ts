import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getUserData = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || ""

    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)

    return decoded.id
  }
  catch (err: any) {
    throw new Error(err.message)
  }
}
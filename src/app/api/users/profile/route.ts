import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import { getUserData } from "@/utils/getUserData";

connect()

export async function POST(request: NextRequest) {
  const userId = await getUserData(request)
  const user = await User.findOne({ _id: userId }).select('-password')

  return NextResponse.json({
    message: "User found",
    success: true,
    data: user
  },
    { status: 200 })

}
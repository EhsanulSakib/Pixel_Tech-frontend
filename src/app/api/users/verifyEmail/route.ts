import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body
    console.log(token)

    const user = await User.findOne({ verifyToken: token, verifyTokenExpire: { $gt: Date.now() } })

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    console.log(user)

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpire = undefined

    await user.save()

    return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 })

  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
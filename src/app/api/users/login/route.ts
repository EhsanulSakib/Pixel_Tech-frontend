import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log(body)

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 })
    }
    console.log("User found")

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Check your credentials" }, { status: 400 })
    }

    const tokenData = {
      id: user._id,
      userName: user.name,
      email: user.email,
    }

    const token = await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1d' })

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        isAdmin: user.isAdmin,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified,
        phoneNumber: user.phoneNumber,
        address: user.address
      }
    })

    response.cookies.set("token", token, {
      httpOnly: true,
    })

    return response
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/utils/mailer.util";

connect()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userName, email, password } = body

    //validation
    console.log(body)

    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      name: userName,
      email,
      password: hashedPassword
    })


    const savedUser = await newUser.save()
    console.log(savedUser)


    //send verification email
    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })

    //TODO: send verification email

    return NextResponse.json({ message: "User registered successfully", success: true, savedUser }, { status: 200 })


  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    console.log(email)
    console.log(emailType)
    console.log(typeof (emailType))
    console.log(userId)


    if (emailType === 'VERIFY') {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpire: new Date(Date.now() + 3600000)
        }
      })
    }

    else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpire: new Date(Date.now() + 3600000)
        }
      })
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    } as SMTPTransport.Options);

    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.APP_EMAIL,
    //     pass: process.env.APP_PASSWORD
    //   }
    // });

    const mailOptions = {
      from: process.env.APP_EMAIL, // sender address
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Password',
      html: `<p>Click <a href="${process.env.CLIENT_URL}/${emailType === 'VERIFY' ? 'verifyEmail' : 'resetEmail'}?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} or copy and paste this link in your browser.<br>
      ${process.env.CLIENT_URL}/${emailType === 'VERIFY' ? 'verifyEmail' : 'resetEmail'}?token=${hashedToken}
      </p>`
    };

    const mailResponse = await transporter.sendMail(mailOptions, function (err: any, info: any) {
      if (err) {
        console.log(err)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    return mailResponse
  }
  catch (err: any) {
    throw new Error(err.message)
  }
}
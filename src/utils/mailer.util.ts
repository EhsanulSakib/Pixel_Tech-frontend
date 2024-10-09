import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'
import SMTPConnection from "nodemailer/lib/smtp-connection";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)


    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpire: Date.now() + 3600000 })
    }

    else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordExpire: Date.now() + 3600000 })
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    } as SMTPTransport.Options);

    const mailOptions = {
      from: 'ehsanulsakib.professional@gmail.com', // sender address
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Password',
      html: `<p>Click <a href="${process.env.CLIENT_URL}/${emailType === 'VERIFY' ? 'verifyEmail' : 'resetEmail'}?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} or copy and paste this link in your browser.<br>
      ${process.env.CLIENT_URL}/${emailType === 'VERIFY' ? 'verifyEmail' : 'resetEmail'}?token=${hashedToken}
      </p>`
    };

    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse
  }
  catch (err: any) {
    throw new Error(err.message)
  }
}
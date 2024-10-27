import transporter from "../config/nodemailer.mjs";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

export const generateOtp = () => crypto.randomInt(100000, 999999); // Generates a 6-digit OTP

export const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: `"Photo Marketplace" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Your OTP for Account Verification",
        text: `Your OTP for account verification is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP email sent");
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};

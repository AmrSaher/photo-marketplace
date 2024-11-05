import dotenv from "dotenv";
import crypto from "crypto";
import formData from "form-data";
import Mailgun from "mailgun.js";

dotenv.config();

export const generateOtp = () => crypto.randomInt(100000, 999999); // Generates a 6-digit OTP

export const sendOtpEmail = (email, otp) => {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: "api",
        key: process.env.MAILGUN_API_KEY,
    });

    mg.messages
        .create("sandbox-123.mailgun.org", {
            from: `Excited User <${process.env.MAILGUN_EMAIL}>`,
            to: [email],
            subject: "Your OTP for Account Verification",
            text: `Your OTP for account verification is: ${otp}`,
        })
        .then((msg) => console.log(msg))
        .catch((err) => console.log(err));
};

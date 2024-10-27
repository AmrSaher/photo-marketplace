import Application from "../models/Application.mjs";
import User from "../models/User.mjs";
import { generateOtp, sendOtpEmail } from "../utils/otp.mjs";

export const registerPage = (req, res) => {
    res.render("register");
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.redirect("/login");
};

export const loginPage = (req, res) => {
    res.render("login");
};

export const logout = (req, res) => {
    req.logout((err) => {
        res.redirect("/login");
    });
};

export const verifiyPage = async (req, res) => {
    const otp = generateOtp();

    await User.findByIdAndUpdate(req.user._id, {
        otp,
        otpExp: new Date(Date.now() + 10 * 60 * 1000),
    });
    await sendOtpEmail(req.user.email, otp);

    return res.render("verifiy-account");
};

export const verifiy = async (req, res) => {
    const { otp } = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, {
        otp: undefined,
        otpExp: undefined,
    });

    // if (otp != req.user.otp || req.user.otpExp < Date.now()) {
    //     req.flash("error_msg", "OTP is wrong");
    //     res.redirect("/verifiy-account");
    // }

    try {
        const selfie = req.files["selfie"][0]["path"];
        const nationalId = req.files["national_id"][0]["path"];

        if (!selfie || !nationalId) {
            req.flash("error_msg", "Both selfie and national ID are required");
            return res.redirect("/photos");
        }

        console.log("do");

        user.verificationStatus = "Pending";
        const newApplication = new Application({
            user: req.user.id,
            nationalIdImagePath: nationalId,
            selfieImagePath: selfie,
        });
        await newApplication.save();
        await user.save();
    } catch (error) {
        req.flash("error_msg", "File upload failed");
        console.error(error);
    }

    return res.redirect("/photos");
};

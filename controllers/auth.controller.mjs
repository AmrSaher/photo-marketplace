import Application from "../models/Application.mjs";
import User from "../models/User.mjs";
import { generateOtp, sendOtpEmail } from "../utils/otp.mjs";
import Transaction from "../models/Transaction.mjs";
import { matchedData, validationResult } from "express-validator";

export const registerPage = (req, res) =>
    res.render("register", { errors: {} });

export const register = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = {};
        validationErrors.array().forEach((error) => {
            errors[error.path] = error.msg;
        });

        return res.render("register", { errors });
    }

    const data = matchedData(req);

    try {
        const user = new User({
            name: data.name,
            email: data.email,
            password: data.password,
            postalCode: data?.postal_code,
            address: data?.address,
        });
        await user.save();
    } catch (err) {
        req.flash("error_msg", "Something wrong!");
        return res.redirect("/register");
    }

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
    // await sendOtpEmail(req.user.email, otp);

    res.renderWithLayout("verifiy-account");
};

export const verifiy = async (req, res) => {
    const { otp } = req.body;

    if (otp != req.user.otp || req.user.otpExp < Date.now()) {
        req.flash("error_msg", "OTP is wrong");
        return res.redirect("/verifiy-account");
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        otp: undefined,
        otpExp: undefined,
    });

    try {
        const selfie = req.files["selfie"][0]["path"];
        const frontNationalId = req.files["front_national_id"][0]["path"];
        const backNationalId = req.files["back_national_id"][0]["path"];

        if (!selfie || !frontNationalId || !backNationalId) {
            req.flash("error_msg", "Both selfie and national ID are required");
            return res.redirect("/photos");
        }

        user.verificationStatus = "Pending";
        user.selfieImagePath = selfie;
        user.frontNationalIdImagePath = frontNationalId;
        user.backNationalIdImagePath = backNationalId;

        const newApplication = new Application({
            user: req.user.id,
        });

        await newApplication.save();
        await user.save();
    } catch (error) {
        req.flash("error_msg", "File upload failed");
        console.error(error);
    }

    return res.redirect("/photos");
};

export const profilePage = async (req, res) => {
    const transactions = await Transaction.find({ to: req.user._id });
    let balance = 0;

    for (let transaction of transactions) {
        balance += (transaction.type == "Income" ? 1 : -1) * transaction.amount;
    }
    res.renderWithLayout("profile", { user: req.user, balance });
};

import Application from "../models/Application.mjs";
import User from "../models/User.mjs";
import { generateOtp, sendOtpEmail } from "../utils/otp.mjs";
import Transaction from "../models/Transaction.mjs";
import { matchedData, validationResult } from "express-validator";
import { getErrors } from "../utils/validation.mjs";
import bcrypt from "bcryptjs";

export const registerPage = (req, res) =>
    res.render("auth/register", { errors: {} });

export const register = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = getErrors(validationErrors);
        return res.render("auth/register", { errors });
    }

    const data = matchedData(req);

    try {
        const user = new User({
            ...data,
            postal_code: undefined,
            password_confirmation: undefined,
            postalCode: data?.postal_code,
            phoneNumber: data.phone_number,
        });
        await user.save();
    } catch (err) {
        req.flash("error_msg", "Something wrong!");
        return res.redirect("/register");
    }

    res.redirect("/login");
};

export const loginPage = (req, res) =>
    res.render("auth/login", { errors: {} });

export const logout = (req, res) => {
    req.logout((err) => res.redirect("/login"));
};

export const verifiyPage = async (req, res) => {
    const otp = generateOtp();

    await User.findByIdAndUpdate(req.user._id, {
        otp,
        otpExp: new Date(Date.now() + 10 * 60 * 1000),
    });
    // await sendOtpEmail(req.user.email, otp);

    res.renderWithLayout("auth/verifiy-account", { errors: {} });
};

export const verifiy = async (req, res) => {
    const { otp } = req.body;

    if (otp != req.user.otp || req.user.otpExp < Date.now()) {
        return res.renderWithLayout("auth/verifiy-account", {
            errors: { otp: "OTP is wrong." },
        });
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
        otp: null,
        otpExp: null,
    });

    try {
        let selfie;
        let frontNationalId;
        let backNationalId;
        try {
            selfie = req.files["selfie"][0]["path"];
            frontNationalId = req.files["front_national_id"][0]["path"];
            backNationalId = req.files["back_national_id"][0]["path"];
        } catch (err) {
            return res.renderWithLayout("auth/verifiy-account", {
                errors: { images: "Images are required." },
            });
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
        req.flash("error_msg", "File upload failed.");
        console.error(error);
        return res.redirect("/verifiy-account");
    }

    return res.redirect("/photos");
};

export const profilePage = async (req, res) => {
    const transactions = await Transaction.find({ to: req.user._id });
    let balance = 0;

    for (let transaction of transactions) {
        balance += (transaction.type == "Income" ? 1 : -1) * transaction.amount;
    }
    res.renderWithLayout("auth/profile", {
        user: req.user,
        balance,
        errors: {},
    });
};

export const changePassword = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = getErrors(validationErrors);
        req.flash("error_msg", errors);
        return res.redirect("/profile");
    }

    const data = matchedData(req);
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(
        data.current_password,
        req.user.password
    );
    if (!isMatch) {
        req.flash("error_msg", "Current password is wrong.");
        return res.redirect("/profile");
    }

    user.password = data.new_password;
    await user.save();

    req.flash("success_msg", "Password changed successfully!");
    res.redirect("/profile");
};

export const editProfile = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = getErrors(validationErrors);
        req.flash("error_msg", errors);
        return res.redirect("/profile");
    }

    const data = matchedData(req);

    await User.findByIdAndUpdate(req.user.id, {
        ...data,
        postal_code: undefined,
        postalCode: data.postal_code,
    });

    req.flash("success_msg", "Profile updated successfully!");
    res.redirect("/profile");
};

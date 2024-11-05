import User from "../../models/User.mjs";
import bcrypt from "bcryptjs";

export default {
    email: {
        isEmail: {
            errorMessage: "Please provide a valid email address.",
        },
        notEmpty: {
            errorMessage: "Email is required.",
        },
        custom: {
            options: async (email) => {
                // Check if the email exists in the database
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("Email does not exist.");
                }
                return true;
            },
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required.",
        },
        custom: {
            options: async (password, { req }) => {
                const user = await User.findOne({ email: req.body.email });
                if (!user) {
                    throw new Error("Invalid credentials."); // To prevent password check without email
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Incorrect password.");
                }
                return true;
            },
        },
    },
};

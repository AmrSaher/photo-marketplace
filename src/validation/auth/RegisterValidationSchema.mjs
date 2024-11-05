import User from "../../models/User.mjs";

export default {
    name: {
        notEmpty: {
            errorMessage: "Name is required.",
        },
        isLength: {
            options: { min: 3, max: 30 },
            errorMessage: "Name must be between 3 and 30 characters.",
        },
    },
    email: {
        notEmpty: {
            errorMessage: "Email is required.",
        },
        isEmail: {
            errorMessage: "Please provide a valid email address.",
        },
        custom: {
            options: async (value) => {
                const existingUser = await User.findOne({ email: value });
                if (existingUser) {
                    throw new Error("Email is already in use.");
                }
                return true;
            },
        },
    },
    phone_number: {
        notEmpty: {
            errorMessage: "Phone number is required.",
        },
    },
    country: {
        optional: true,
    },
    address: {
        isLength: {
            options: { min: 5 },
            errorMessage: "Address should be at least 5 characters long",
        },
        optional: true,
    },
    postal_code: {
        isPostalCode: {
            options: "any",
            errorMessage: "Please enter a valid Postal Code",
        },
        optional: true,
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required.",
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters long.",
        },
    },
    password_confirmation: {
        notEmpty: {
            errorMessage: "Password confirmation is required.",
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error(
                        "Password confirmation does not match password."
                    );
                }
                return true;
            },
        },
    },
};

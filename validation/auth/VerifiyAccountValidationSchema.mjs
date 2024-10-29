export default {
    otp: {
        in: ["body"],
        notEmpty: {
            errorMessage: "OTP is required.",
        },
        isLength: {
            options: { min: 6, max: 6 },
            errorMessage: "OTP must be exactly 6 digits.",
        },
    },
};

export default {
    current_password: {
        notEmpty: {
            errorMessage: "Current password is required.",
        },
    },
    new_password: {
        notEmpty: {
            errorMessage: "New password is required.",
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "New password must be at least 8 characters long.",
        },
    },
    new_password_confirmation: {
        notEmpty: {
            errorMessage: "New password confirmation is required.",
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.new_password) {
                    throw new Error(
                        "New password confirmation does not match password."
                    );
                }
                return true;
            },
        },
    },
};

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
    address: {
        notEmpty: {
            errorMessage: "Address is required",
        },
        isLength: {
            options: { min: 5 },
            errorMessage: "Address should be at least 5 characters long",
        },
        optional: true,
    },
    postal_code: {
        notEmpty: {
            errorMessage: "Postal Code is required",
        },
        isPostalCode: {
            options: "any",
            errorMessage: "Please enter a valid Postal Code",
        },
        optional: true,
    },
};

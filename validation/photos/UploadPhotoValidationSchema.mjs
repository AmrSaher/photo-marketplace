export default {
    title: {
        notEmpty: {
            errorMessage: "Title is required.",
        },
        isLength: {
            options: { min: 3, max: 100 },
            errorMessage: "Title should be between 3 and 100 characters.",
        },
    },
    description: {
        isLength: {
            options: { max: 500 },
            errorMessage: "Description should not exceed 500 characters.",
        },
    },
    price: {
        isNumber: {
            options: { min: 0 },
            errorMessage: "Price must be a positive number.",
        },
    },
};

export const getErrors = (validationErrors) => {
    let errors = {};

    validationErrors.array().forEach((error) => {
        errors[error.path] = error.msg;
    });

    return errors;
};

export default (req, res, next) => {
    if (req.user.verificationStatus == "Verified") {
        return next();
    }
    req.flash("error_msg", "Please verifiy your account to view that resource");
    res.redirect("/verifiy-account");
};

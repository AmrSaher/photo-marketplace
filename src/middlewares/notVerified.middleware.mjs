export default (req, res, next) => {
    if (req.user.verificationStatus == "NotVerified") {
        return next();
    }
    req.flash("error_msg", "You are verified already!");
    res.redirect("/");
};

export default (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    req.flash("error_msg", "You are already authenticated");
    res.redirect("/");
};

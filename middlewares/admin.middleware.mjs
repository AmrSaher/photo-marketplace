export default (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    req.flash("error_msg", "Admin access only");
    res.redirect("/");
};

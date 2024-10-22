// config.js
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "Please log in to view that resource");
        res.redirect("/login");
    },
    ensureNotAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "You are already authenticated");
        res.redirect("/");
    },
    ensureAdmin: function (req, res, next) {
        if (req.user && req.user.isAdmin) {
            return next();
        }
        req.flash("error_msg", "Admin access only");
        res.redirect("/");
    },
};

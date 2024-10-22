const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { ensureNotAuthenticated, ensureAuthenticated } = require("../config");

// Register
router.get("/signup", ensureNotAuthenticated, (req, res) =>
    res.render("signup")
);

router.post("/signup", ensureNotAuthenticated, async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.redirect("/login");
});

// Login
router.get("/login", ensureNotAuthenticated, (req, res) => res.render("login"));

router.post(
    "/login",
    ensureNotAuthenticated,
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true,
    })
);

// Logout
router.get("/logout", ensureAuthenticated, (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        } // Handle errors if needed
        req.session.destroy(() => {
            res.redirect("/login"); // Redirect to login or home page after logging out
        });
    });
});

module.exports = router;

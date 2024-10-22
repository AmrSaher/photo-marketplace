const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../config");
const User = require("../models/User");

// Admin dashboard
router.get("/dashboard", ensureAdmin, async (req, res) => {
    const pendingUsers = await User.find({ isVerified: false });
    res.render("admin-dashboard", { pendingUsers });
});

// Approve users
router.post("/approve-user/:id", ensureAdmin, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isVerified: true });
    res.redirect("/admin/dashboard");
});

module.exports = router;

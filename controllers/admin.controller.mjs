import User from "../models/User.mjs";

export const dashboard = async (req, res) => {
    const pendingUsers = await User.find({ isVerified: false });
    res.render("admin-dashboard", { pendingUsers });
};

export const approveUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isVerified: true });
    res.redirect("/admin/dashboard");
};

import adminRoutes from "./admin.routes.mjs";
import authRoutes from "./auth.routes.mjs";
import photoRoutes from "./photo.routes.mjs";
import walletRoutes from "./wallet.routes.mjs";
import { Router } from "express";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/", authRoutes);
router.use("/photos", photoRoutes);
router.use("/wallet", walletRoutes);

router.get("/", (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/photos");
    res.render("landing");
});

export default router;

import { Router } from "express";
import passport from "passport";
import { authenticated, guest, notVerified } from "../middlewares/index.mjs";
import * as AuthController from "../controllers/auth.controller.mjs";
import upload from "../config/multer.mjs";

const router = Router();

// Register
router.get("/register", guest, AuthController.registerPage);
router.post("/register", guest, AuthController.register);

// Login
router.get("/login", guest, AuthController.loginPage);
router.post(
    "/login",
    guest,
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })
);

// Logout
router.get("/logout", authenticated, AuthController.logout);

// Verifiy Account
router.get(
    "/verifiy-account",
    authenticated,
    notVerified,
    AuthController.verifiyPage
);
router.post(
    "/verifiy-account",
    authenticated,
    notVerified,
    upload.fields([
        { name: "selfie", maxCount: 1 },
        { name: "national_id", maxCount: 1 },
    ]),
    AuthController.verifiy
);

export default router;

import { Router } from "express";
import passport from "passport";
import { authenticated, guest, notVerified } from "../middlewares/index.mjs";
import * as AuthController from "../controllers/auth.controller.mjs";
import upload from "../config/multer.mjs";
import { checkSchema, validationResult } from "express-validator";
import {
    RegisterValidationSchema,
    ChangePasswordValidationSchema,
    EditProfileValidationSchema,
    LoginValidationSchema,
} from "../validation/index.mjs";
import { getErrors } from "../utils/validation.mjs";

const router = Router();

// Register
router.get("/register", guest, AuthController.registerPage);
router.post(
    "/register",
    guest,
    checkSchema(RegisterValidationSchema),
    AuthController.register
);

// Login
router.get("/login", guest, AuthController.loginPage);
router.post(
    "/login",
    guest,
    checkSchema(LoginValidationSchema),
    (req, res, next) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            const errors = getErrors(validationErrors);
            return res.render("auth/login", { errors });
        }
        next();
    },
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
        { name: "front_national_id", maxCount: 1 },
        { name: "back_national_id", maxCount: 1 },
    ]),
    AuthController.verifiy
);

// Profile
router.get("/profile", authenticated, AuthController.profilePage);
router.post(
    "/change-password",
    authenticated,
    checkSchema(ChangePasswordValidationSchema),
    AuthController.changePassword
);
router.put(
    "/edit-profile",
    authenticated,
    checkSchema(EditProfileValidationSchema),
    AuthController.editProfile
);

export default router;

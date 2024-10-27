import { Router } from "express";
import { admin } from "../middlewares/index.mjs";
import * as AdminController from "../controllers/admin.controller.mjs";

const router = Router();

router.use(admin);

// Admin dashboard
router.get("/dashboard", AdminController.dashboard);

// Approve users
router.post("/approve-user/:id", AdminController.approveUser);

export default router;

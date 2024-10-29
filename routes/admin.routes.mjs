import { Router } from "express";
import { admin } from "../middlewares/index.mjs";

const router = Router();

router.use(admin);

export default router;

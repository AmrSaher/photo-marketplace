import express, { Router } from "express";
import { authenticated } from "../middlewares/index.mjs";
import * as WalletController from "../controllers/wallet.controller.mjs";

const router = Router();

router.use(authenticated);

router.get("/", WalletController.walletPage);
router.post(
    "/deposit",
    express.json(),
    WalletController.deposit
);
router.post(
    "/capture-payment",
    express.json(),
    WalletController.capturePayment
);
router.post(
    "/withdraw",
    express.json(),
    WalletController.withdraw
);

export default router;

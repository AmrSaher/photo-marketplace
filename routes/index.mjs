import { authenticated } from "../middlewares/index.mjs";
import adminRoutes from "./admin.routes.mjs";
import authRoutes from "./auth.routes.mjs";
import photoRoutes from "./photo.routes.mjs";
import walletRoutes from "./wallet.routes.mjs";
import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Photo from "../models/Photo.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.use("/admin", adminRoutes);
router.use("/", authRoutes);
router.use("/photos", photoRoutes);
router.use("/wallet", walletRoutes);

router.get("/", async (req, res) => {
    if (req.isAuthenticated()) return res.redirect("/photos");

    const topPhotos = await Photo.aggregate([
        {
            // Add a new field that contains the length of the owners array
            $addFields: {
                ownersCount: { $size: "$owners" },
            },
        },
        {
            // Sort by ownersCount in descending order
            $sort: { ownersCount: -1 },
        },
        {
            // Limit the results to the top 3
            $limit: 3,
        },
    ]);

    res.renderWithLayout("landing", { topPhotos });
});

router.get("/get-image/:id", (req, res) => {
    const { id } = req.params;
    const imagePath = path.join(__dirname, "../uploads", id);

    // Check if the image exists
    fs.stat(imagePath, (err, stats) => {
        if (err || !stats.isFile()) {
            return res.status(404).send("Image not found");
        }

        res.sendFile(imagePath);
    });
});

export default router;

import express, { Router } from "express";
import {
    authenticated,
    notOwner,
    verified,
    owner,
} from "../middlewares/index.mjs";
import upload from "../config/multer.mjs";
import * as PhotosController from "../controllers/photos.controller.mjs";

const router = Router();

router.use(authenticated);

// Upload photo
router.get("/upload", verified, PhotosController.uploadPage);
router.post(
    "/upload",
    verified,
    upload.single("photo"),
    PhotosController.upload
);

// View photos
router.get("/", PhotosController.getPhotos);
router.get("/my-photos", verified, PhotosController.myPhotos);
router.get("/:id", PhotosController.getPhoto);

// Buy photo
router.post(
    "/buy-photo",
    verified,
    express.json(),
    notOwner,
    PhotosController.buyPhoto
);

// Download photo
router.get(
    "/download/:id",
    authenticated,
    owner,
    PhotosController.downloadPhoto
);

export default router;

import Photo from "../models/Photo.mjs";
import Transaction from "../models/Transaction.mjs";
import User from "../models/User.mjs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

export const uploadPage = (req, res) => res.render("upload");

export const upload = async (req, res) => {
    const { title, description, price } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const originalImagePath = req.file.path;
    const watermarkImagePath = path.join(
        "uploads",
        "watermarked-" + req.file.filename
    );
    const watermark = await sharp(
        path.join(__dirname, "..", "assets", "watermark.png")
    )
        .resize(300)
        .toBuffer();

    await sharp(originalImagePath)
        .composite([
            { input: watermark, gravity: "northwest" },
            { input: watermark, gravity: "northeast" },
            { input: watermark, gravity: "southwest" },
            { input: watermark, gravity: "southeast" },
            { input: watermark, gravity: "center" },
        ])
        .toFile(watermarkImagePath);

    const newPhoto = new Photo({
        title,
        description,
        price,
        user: req.user.id,
        watermarkImagePath,
        imagePath: originalImagePath,
        owners: [req.user.id],
    });
    const user = await User.findById(req.user._id);
    user.photos.push(newPhoto.id);

    await newPhoto.save();
    await user.save();

    res.redirect("/photos");
};

export const getPhotos = async (req, res) => {
    const photos = await Photo.find();

    res.render("photos", { photos });
};

export const myPhotos = async (req, res) => {
    const photos = await Photo.find({ owners: { $in: [req.user.id] } });
    res.render("my-photos", { photos });
};

export const getPhoto = async (req, res) => {
    const { id } = req.params;
    const photo = await Photo.findById(id);

    res.render("photo", { photo });
};

export const buyPhoto = async (req, res) => {
    const { photoId } = req.body;

    const photo = await Photo.findById(photoId);
    const user = await User.findById(req.user._id);
    const transactions = await Transaction.find({ to: req.user._id });
    let balance = 0;

    for (let transaction of transactions) {
        balance += (transaction.type == "Income" ? 1 : -1) * transaction.amount;
    }

    if (photo.price > balance) {
        return res.status(400).json({ msg: "Insufficient balance" });
    }

    const outcomeTransaction = new Transaction({
        to: req.user._id,
        amount: photo.price,
        type: "Outcome",
        title: "Photo Transaction - Purchase",
    });
    const incomeTransaction = new Transaction({
        to: photo.user,
        amount: photo.price,
        type: "Income",
        title: "Photo Transaction - Sale",
    });

    try {
        await outcomeTransaction.save();
        await incomeTransaction.save();

        user.photos.push(photoId);
        await user.save();

        photo.owners.push(req.user.id);
        await photo.save();

        res.status(200).json({
            msg: "Bought successfully",
        });
    } catch (err) {
        res.status(500).json({
            msg: "Server error, try again",
        });
    }
};

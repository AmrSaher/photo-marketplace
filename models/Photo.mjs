import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
    {
        title: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        description: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        price: {
            type: mongoose.Schema.Types.Number,
            required: true,
        },
        imagePath: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        watermarkImagePath: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        owners: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Photo", PhotoSchema);

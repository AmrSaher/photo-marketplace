import mongoose from "mongoose";
import User from "./User.mjs";

const ApplicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Application", ApplicationSchema);

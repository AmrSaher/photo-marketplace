import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        nationalIdImagePath: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        selfieImagePath: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        isAccepted: {
            type: mongoose.Schema.Types.Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Application", ApplicationSchema);

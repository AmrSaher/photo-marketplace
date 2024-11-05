import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        title: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: mongoose.Schema.Types.Number,
            required: true,
            min: 0,
        },
        type: {
            type: mongoose.Schema.Types.String,
            enum: ["Income", "Outcome"],
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);

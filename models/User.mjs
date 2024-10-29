import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true,
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        verificationStatus: {
            type: mongoose.Schema.Types.String,
            enum: ["NotVerified", "Pending", "Verified"],
            required: true,
            default: "NotVerified",
        },
        frontNationalIdImagePath: {
            type: mongoose.Schema.Types.String,
        },
        backNationalIdImagePath: {
            type: mongoose.Schema.Types.String,
        },
        selfieImagePath: {
            type: mongoose.Schema.Types.String,
        },
        isAdmin: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },
        otp: {
            type: mongoose.Schema.Types.String,
        },
        otpExp: {
            type: mongoose.Schema.Types.Date,
        },
        photos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Photo",
            },
        ],
        address: {
            type: mongoose.Schema.Types.String,
        },
        postalCode: {
            type: mongoose.Schema.Types.String,
        }
    },
    { timestamps: true }
);

// Encrypt password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model("User", UserSchema);

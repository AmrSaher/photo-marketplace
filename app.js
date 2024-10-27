import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import passportLocalStrategy from "./config/passport.mjs";
import routes from "./routes/index.mjs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Configrations
dotenv.config();
passportLocalStrategy(passport);
mongoose.connect(process.env.MONGO_URI);

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY || "yourSecretKey",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user || null;
    next();
});

// Routes
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

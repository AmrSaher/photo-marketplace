// app.js
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const passportLocalStrategy = require("./config/passport");

dotenv.config();
passportLocalStrategy(passport);

const app = express();

// DB setup
mongoose.connect(process.env.MONGO_URI);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use('/uploads', express.static('uploads'));

// Session setup
app.use(
    session({
        secret: "yourSecretKey", // You should replace this with your secret
        resave: false, // Avoid resaving session if unmodified
        saveUninitialized: false, // Don't save uninitialized sessions
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week (in milliseconds)
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
const authRoutes = require("./routes/auth");
const photoRoutes = require("./routes/photo");
const adminRoutes = require("./routes/admin");

app.use("/", authRoutes);
app.use("/photos", photoRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import passportLocalStrategy from "./config/passport.mjs";
import routes from "./routes/index.mjs";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import "./config/db.mjs";

// Configrations
dotenv.config();
passportLocalStrategy(passport);

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
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
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user || null;
    next();
});
app.use((req, res, next) => {
    res.renderWithLayout = (view, options = {}) => {
        ejs.renderFile(`views/${view}.ejs`, options, (err, html) => {
            if (err) return next(err);
            ejs.renderFile(
                "views/layouts/layout.ejs",
                {
                    ...options,
                    body: html,
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                },
                (err, finalHtml) => {
                    if (err) return next(err);
                    res.send(finalHtml);
                }
            );
        });
    };
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(flash());
app.use((req, res, next) => {
    res.locals.successMessage = req.flash("success_msg");
    res.locals.errorMessage = req.flash("error_msg");
    next();
});

// Routes
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

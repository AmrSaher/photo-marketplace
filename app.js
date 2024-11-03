import dotenv from "dotenv";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
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
import { admin as AdminMiddleware } from "./middlewares/index.mjs";
import User from "./models/User.mjs";
import mongoose from "mongoose";
import { Components, componentLoader } from "./components.mjs";
import methodOverride from 'method-override';

// Configrations
dotenv.config();
passportLocalStrategy(passport);
AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const admin = new AdminJS({
    databases: [mongoose],
    resources: [
        {
            resource: User,
            options: {
                properties: {
                    selfieImagePath: {
                        isVisible: {
                            list: true,
                            filter: true,
                            show: true,
                            edit: true,
                        },
                        components: {
                            list: Components.SelfieImageComponent,
                            show: Components.SelfieImageComponent,
                        },
                    },
                    frontNationalIdImagePath: {
                        isVisible: {
                            list: true,
                            filter: true,
                            show: true,
                            edit: true,
                        },
                        components: {
                            list: Components.FIDImageComponent,
                            show: Components.FIDImageComponent,
                        },
                    },
                    backNationalIdImagePath: {
                        isVisible: {
                            list: true,
                            filter: true,
                            show: true,
                            edit: true,
                        },
                        components: {
                            list: Components.BIDImageComponent,
                            show: Components.BIDImageComponent,
                        },
                    },
                },
            },
        },
    ],
    componentLoader,
});
admin.watch();

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
    res.renderWithLayout = (view, options = {}, layout = "user") => {
        ejs.renderFile(`views/${view}.ejs`, options, (err, html) => {
            if (err) return next(err);
            ejs.renderFile(
                layout == "user"
                    ? "views/layouts/main.ejs"
                    : "views/layouts/admin.ejs",
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
app.use(express.static("public"));
app.use(flash());
app.use((req, res, next) => {
    res.locals.successMessage = req.flash("success_msg");
    res.locals.errorMessage = req.flash("error_msg");
    next();
});

// Routes
const adminRouter = AdminJSExpress.buildRouter(admin);

app.use(admin.options.rootPath, AdminMiddleware, adminRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(routes);

export default app;
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     console.log(
//         `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
//     );
// });

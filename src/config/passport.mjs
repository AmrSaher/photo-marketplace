import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.mjs";

export default (passport) => {
    passport.use(
        new LocalStrategy(
            { usernameField: "email", passReqToCallback: true },
            async (req, email, password, done) => {
                // Match user
                const user = await User.findOne({ email });
                if (!user) {
                    req.flash("error_msg", {
                        email: "That email is not registered.",
                    });
                    return done(null, false);
                }

                // Match password
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    req.flash("error_msg", {
                        password: "Password incorrect.",
                    });
                    return done(null, false);
                }

                return done(null, user);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};

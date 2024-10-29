import Photo from "../models/Photo.mjs";

export default async (req, res, next) => {
    const photo = await Photo.findById(req.body?.photoId || req.params?.id);

    if (photo.owners.includes(req.user.id)) {
        return next();
    }

    req.flash("error_msg", "You do not own this photo");
    res.redirect("/photos/" + photo.id);
};

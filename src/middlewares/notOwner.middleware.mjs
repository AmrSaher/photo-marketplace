import Photo from "../models/Photo.mjs";

export default async (req, res, next) => {
    const photo = await Photo.findById(req.body?.photoId || req.params?.id);

    if (!photo.owners.includes(req.user.id)) {
        return next();
    }

    req.flash("error_msg", "You are already own this photo");
    res.status(400).json({ msg: "The owner can not buy his photos" });
};

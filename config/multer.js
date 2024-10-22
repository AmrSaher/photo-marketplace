const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed extensions
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

// Initialize upload
module.exports = multer({
    storage: storage,
    limits: { fileSize: 1000 * 1000 * 40 }, // Set a limit to the file size (1MB in this case)
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}); // 'image' is the field name from the form

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profile-pics",
        format: async (req, file) => {
            let extArray = file.originalname.split(".");
            let extension = extArray[extArray.length - 1].toLowerCase();
            return extension;
        },
    },
});

const parser = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname || typeof file.originalname !== 'string') {
            return cb(new Error("Invalid file name!"), false);
        }

        // Get extension - handle cases with no extension
        const nameParts = file.originalname.toLowerCase().split(".");
        const extension = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

        // Allow common image extensions
        const allowedExt = ["png", "jpg", "jpeg", "gif", "webp", "bmp"];
        const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/bmp"];

        const isValidExt = extension && allowedExt.includes(extension);
        const isValidMime = allowedMimeTypes.includes(file.mimetype);

        if (!extension) {
            return cb(new Error("File must have an extension (e.g., .jpg, .png)"), false);
        }

        if (!isValidExt && !isValidMime) {
            return cb(new Error(`Only image files (PNG, JPG, JPEG, GIF, WEBP) are allowed!`), false);
        }

        cb(null, true);
    },
});

module.exports = parser;


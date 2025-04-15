const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");  // Ensure this is where your Cloudinary configuration is located.
const multer = require("multer");


// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Products", // The folder where images will be stored in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // Supported image formats
    transformation: [{ width: 500, height: 500, crop: "limit" }]  // Example transformation (resize)
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

module.exports = upload;



/*
const multer = require("multer");
const path = require("path");
// Configure multer disk storage
const cloudinaryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Specify the destination directory for uploads
  },
  filename: function (req, file, cb) {
    // Create a unique filename by combining a timestamp and the file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const filename = uniqueSuffix + fileExtension;
    cb(null, filename); // Assign the unique filename
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: cloudinaryStorage });
module.exports = upload;
*/





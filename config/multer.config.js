const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: async (req, file, callback) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    req.uniqueImageName = uniqueName;
    callback(null, uniqueName);
  },
});
const upload = multer({
  dest: "uploads/",
  storage,
});

module.exports = upload;

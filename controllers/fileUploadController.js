const multer = require("multer");
const path = require("path");
const File = require("../models/file");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
}).single("image");

const uploadImage = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (!req.file) {
      return res.status(400).send({ message: "No file selected" });
    }
    const fileUrl = req.file.path.replace(/\\/g, "/");
    const newFile = new File({ url: fileUrl });

    await newFile.save();

    res.send({
      message: "File uploaded and saved successfully",
      file: newFile,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error occurred during upload or database operation",
      error: err,
    });
  }
};

module.exports = {
  uploadImage,
};

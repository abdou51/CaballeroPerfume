const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;

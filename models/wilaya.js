const mongoose = require("mongoose");

const wilayaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

const Wilaya = mongoose.model("Wilaya", wilayaSchema);

module.exports = Wilaya;

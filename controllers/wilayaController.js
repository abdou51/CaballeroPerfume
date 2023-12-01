const Wilaya = require("../models/wilaya");

const createWilaya = async (req, res) => {
  try {
    const newWilaya = new Wilaya({
      name: req.body.name,
      price: req.body.price,
    });

    const createdWilaya = await newWilaya.save();

    res.status(201).json(createdWilaya);
  } catch (error) {
    res.status(500).json({ error: "Error creating Wilaya" });
  }
};
const updateWilaya = async (req, res) => {
  const wilayaId = req.params.id;
  try {
    const updatedWilaya = await Wilaya.findByIdAndUpdate(wilayaId, req.body, {
      new: true,
    });

    if (!updatedWilaya) {
      return res.status(404).json({ error: "Wilaya not found" });
    }

    res.status(200).json(updatedWilaya);
  } catch (error) {
    res.status(500).json({ error: "Error updating Wilaya" });
  }
};
const deleteWilaya = async (req, res) => {
  const wilayaId = req.params.id;
  try {
    const deletedWilaya = await Wilaya.findByIdAndDelete(wilayaId);

    if (!deletedWilaya) {
      return res.status(404).json({ error: "Wilaya not found" });
    }

    res.status(200).json({ message: "Wilaya deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Wilaya" });
  }
};
const getWilayas = async (req, res) => {
  try {
    const wilayas = await Wilaya.find();
    res.status(200).json(wilayas);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Wilayas" });
  }
};

module.exports = {
  createWilaya,
  updateWilaya,
  deleteWilaya,
  getWilayas,
};

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyName: { type: String, required: true },
  totalShares: { type: Number, required: true },
  contractAddress: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bhk: { type: Number, required: true },
  bath: { type: Number, required: true },
});

const PropertyModel = mongoose.model("Property", propertySchema);

module.exports = PropertyModel;

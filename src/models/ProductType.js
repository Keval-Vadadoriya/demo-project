const mongoose = require("../db/mongoose");

const productTypeSchema = mongoose.Schema({
  ProductType: {
    type: String,
    unique: true,
  },
  Description: {
    type: String,
  },
});

const ProductType = mongoose.model("ProductType", productTypeSchema);

module.exports = ProductType;

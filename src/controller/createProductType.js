const ProductType = require("../models/ProductType");

const createProductType = async (req, res) => {
  try {
    req.body.owner = req.user._id;
    let productType = new ProductType(req.body);
    productType = await productType.save();
    res.status(201).send(productType);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = createProductType;

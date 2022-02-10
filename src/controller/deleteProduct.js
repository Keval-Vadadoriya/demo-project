const Product = require("../models/Product");

const deleteProduct = async function (req, res) {
  try {
    const product = await Product.findOne({
      _id: req.query.id,
    });

    if (req.user._id.toString() !== product.owner.toString()) {
      throw new Error("unauthorized delete");
    }
    const deleteProduct = await Product.deleteOne({
      _id: req.query.id,
    });
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = deleteProduct;

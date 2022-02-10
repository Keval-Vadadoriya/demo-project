const Product = require("../models/Product");

const allProducts = async function (req, res) {
  try {
    const allProducts = await Product.find({}).populate({
      path: "owner",
      select: {
        _id: 1,
        name: 1,
      },
    });
    res.send(allProducts);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = allProducts;

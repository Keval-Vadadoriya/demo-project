const ProductType = require("../models/ProductType");

const allProductTypes = async function (req, res) {
  try {
    const allProductType = await ProductType.find({}).populate({
      path: "owner",
      select: {
        _id: 1,
        name: 1,
      },
    });
    res.send(allProductType);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = allProductTypes;

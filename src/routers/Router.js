const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const ProductType = require("../models/ProductType");
const auth = require("../middleware/Auth");
const { findOneAndUpdate } = require("../models/User");
const router = express.Router();

router.get("", (req, res) => {
  res.send("Hey There again");
});

//   register user
router.post("/signup", async function (req, res) {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();

    const usr = await user.save();
    res.status(201).send(usr);
  } catch (e) {
    res.send(e);
  }
});

//   login user
router.post("/login", async function (req, res) {
  try {
    const user = await User.verifyUser(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

//   create product types
router.post("/createproducttype", async function (req, res) {
  try {
    const producttype = new ProductType(req.body);

    const producttype2 = await producttype.save();
    res.status(201).send(producttype2);
  } catch (e) {
    res.send(e);
  }
});

//   get all product types
router.get("/getallproducttype", async function (req, res) {
  try {
    const allProductType = await ProductType.find({}).exec();
    res.send(allProductType);
  } catch (e) {
    res.send(e);
  }
});

//   create product
router.post("/createproduct", async function (req, res) {
  try {
    const product = new Product(req.body);

    const product2 = await product.save();
    res.status(201).send(product2);
  } catch (e) {
    res.send(e);
  }
});

//   edit product
router.patch("/editproduct", async function (req, res) {
  res.send("Hey There");
});

//   delete product
router.delete("/deleteproduct", async function (req, res) {
  try {
    const product = await Product.findOneAndDelete({
      product: req.body.product,
    });
    res.status(200).send(product);
  } catch (e) {
    res.send(e);
  }
});

//   get all product
router.get("/getallproduct", async function (req, res) {
  try {
    const allProducts = await Product.find({}).exec();
    res.send(allProducts);
  } catch (e) {
    res.send(e);
  }
});

//   get product by products types
router.get("/productbyproducttype", async function (req, res) {
  try {
    const byProductType = await Product.find({
      ProductType: req.body.ProductType,
    }).exec();
    res.send(byProductType);
  } catch (e) {
    res.send(e);
  }
});

//   get most recent product
router.get("/mostrecentproduct", async function (req, res) {
  res.send("Hey There");
});

//   get most liked product
router.get("/mostlikedproduct", async function (req, res) {
  res.send("Hey There");
});

//   comment on product
router.patch("/commentproduct", async function (req, res) {
  try {
    const product = await Product.findOne({ product: req.body.product }).exec();
    product.Comment.push(req.body.comment);
    product.save().then((me) => {
      res.send(me);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

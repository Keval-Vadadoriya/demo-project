const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const ProductType = require("../models/ProductType");
const auth = require("../middleware/Auth");

const router = express.Router();

router.get("", (req, res) => {
  res.send("Welcome to ecommerce Site");
});

//   register user
router.post("/signup", async function (req, res) {
  try {
    const user = new User(req.body);
    const user2 = await user.hashPswd();
    const token = await user2.generateAuthToken();
    res.status(201).send({ user2, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//   login user
router.post("/login", async function (req, res) {
  try {
    console.log(req.body.email, req.body.password);
    const user = await User.verifyUser(req.body.email, req.body.password);
    console.log(user);
    const token = await user.generateAuthToken();
    console.log(token);
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//   create product types
router.post("/createproducttype", auth, async function (req, res) {
  try {
    req.body.Owner = req.user._id;
    const producttype = new ProductType(req.body);
    const producttype2 = await producttype.save();
    res.status(201).send(producttype2);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   get all product types
router.get("/getallproducttype", auth, async function (req, res) {
  try {
    const allProductType = await ProductType.find({}).exec();
    res.send(allProductType);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   create product
router.post("/createproduct", auth, async function (req, res) {
  try {
    const productType = await ProductType.find({
      ProductType: req.body.ProductType,
    }).exec();

    if (productType.length === 0) {
      throw new Error("invalid ProductType");
    }

    req.body.Owner = req.user._id;
    const product = new Product(req.body);

    const product2 = await product.save();
    res.status(201).send(product2);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   edit product
router.patch("/editproduct", auth, async function (req, res) {
  try {
    const product = await Product.findOne({
      product: req.body.product,
    });
    console.log(product);
    if (req.user._id.toString() !== product.Owner.toString()) {
      throw new Error();
    }
    const updateProduct = await Product.updateOne(
      {
        product: req.body.product,
      },
      req.body
    );

    res.send(updateProduct);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   delete product
router.delete("/deleteproduct", auth, async function (req, res) {
  try {
    const product = await Product.findOne({
      product: req.body.product,
    });

    if (!req.user._id.toString() === product.Owner.toString()) {
      throw new Error();
    }
    const deleteProduct = await Product.deleteOne({
      product: req.body.product,
    });
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   get all product
router.get("/getallproduct", auth, async function (req, res) {
  try {
    const allProducts = await Product.find({}).exec();
    res.send(allProducts);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   get product by products types
router.get("/productbyproducttype", auth, async function (req, res) {
  try {
    const byProductType = await Product.find({
      ProductType: req.body.ProductType,
    }).exec();
    res.send(byProductType);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   get most recent product
router.get("/mostrecentproduct", auth, async function (req, res) {
  try {
    const product = await Product.find({}).sort({ createdAt: -1 }).limit(1);
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   get most liked product
router.get("/mostlikedproduct", auth, async function (req, res) {
  try {
    console.log("I am Here");
    const product = await Product.find({}).sort({ Like: -1 }).limit(1);
    console.log(product);
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//   comment on product
router.patch("/commentproduct", auth, async function (req, res) {
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

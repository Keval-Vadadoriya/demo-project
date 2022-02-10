//Express
const express = require("express");

//models
const User = require("../models/User");
const Product = require("../models/Product");
const ProductType = require("../models/ProductType");

//Authentication
const auth = require("../middleware/Auth");

//controllers
const comment = require("../controller/comment");
const deleteProduct = require("../controller/deleteProduct");
const byProductType = require("../controller/productByProductType");
const registerUser = require("../controller/registerUser");
const loginUser = require("../controller/loginUser");
const createProductType = require("../controller/createProductType");
const createProduct = require("../controller/createProduct");
const editProduct = require("../controller/editProduct");
const mostLiked = require("../controller/mostLikedProduct");
const mostRecent = require("../controller/mostRecentProduct");
const allProducts = require("../controller/allProducts");
const allProductTypes = require("../controller/allProductTypes");

const router = express.Router();

router.get("", (req, res) => {
  res.send("Welcome to ecommerce Site");
});

//   register user
router.post("/signup", registerUser);

//   login user
router.post("/login", loginUser);

//   create product types
router.post("/createproducttype", auth, createProductType);

//   get all product types
router.get("/getallproducttype", auth, allProductTypes);

//   create product
router.post("/createproduct", auth, createProduct);

//   edit product
router.patch("/editproduct", auth, editProduct);

//   delete product
router.delete("/deleteproduct", auth, deleteProduct);

//   get all product
router.get("/getallproduct", auth, allProducts);

//   get product by products types
router.get("/productbyproducttype", auth, byProductType);

//   get most recent product
router.get("/mostrecentproduct", auth, mostRecent);

//   get most liked product
router.get("/mostlikedproduct", auth, mostLiked);

//   comment on product
router.patch("/commentproduct", auth, comment);

module.exports = router;

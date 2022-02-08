const express = require('express')
const User = require('../models/User')
const Product = require('../models/Product')
const ProductType = require('../models/ProductType')
const auth = require('../middleware/Auth')
const router=express.Router()

router.get('',(req,res)=>{
    res.send("Hey There again")
})

//   register user
router.post('/signup',async function(req,res){

    try{
        const user=new User(req.body)
        const token = await user.generateAuthToken()
    
       
        const usr = await user.save()
        res.status(201).send(usr)
    }catch(e){
        res.send(e)
    }
    
})

//   login user
router.post('/login',async function(req,res){
    try{
        const user = await User.verifyUser(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
})

//   create product types
router.post('/createproductype',async function(req,res){

    try{
        const producttype=new ProductType(req.body)
    
       
        const producttype2 = await producttype.save()
        res.status(201).send(producttype2)
    }catch(e){
        res.send(e)
    }
})

//   get all product types
router.get('/getallproducttype',(req,res)=>{
    res.send("Hey There")
})

//   create product
router.post('/createproduct',async function(req,res){
    try{
        const product=new Product(req.body)
    
       
        const product2 = await product.save()
        res.status(201).send(product2)
    }catch(e){
        res.send(e)
    }
})

//   edit product
router.patch('/editproduct',auth,(req,res)=>{
    res.send("Hey There")
})

//   delete product
router.delete('/deleteproduct',(req,res)=>{
    res.send("Hey There")
})

//   get all product
router.get('/getallproduct',(req,res)=>{
    res.send("Hey There")
})

//   get product by products types
router.get('/productbyproducttype',(req,res)=>{
    res.send("Hey There")
})

//   get most recent product
router.get('/mostrecentproduct',(req,res)=>{
    res.send("Hey There")
})

//   get most liked product
router.get('/mostlikedproduct',(req,res)=>{
    res.send("Hey There")
})

//   comment on product
router.get('/commentproduct',(req,res)=>{
    res.send("Hey There")
})



module.exports=router
const mongoose = require('../db/mongoose')

const productTypeSchema = mongoose.Schema({
    Product_Type:{
        type:String
    },
    Description:{
        type:String
    },
})

const ProductType = mongoose.model('ProductType',productTypeSchema)

module.exports=ProductType
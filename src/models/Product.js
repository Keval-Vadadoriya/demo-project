const mongoose = require('../db/mongoose')

const productSchema = mongoose.Schema({
    Product:{
        type:String,
        required:true
    },
    ProductType:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Like:{
        type:Number,
        default:0
    },
    Dislike:{
        type:Number,
        default:0
    },
    Comment:[{
        type:String
    }]
},{
    timestamps:true
})

const Product = mongoose.model('Product',productSchema)

module.exports=Product
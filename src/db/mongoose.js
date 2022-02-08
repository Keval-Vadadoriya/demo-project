const  mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/demo-project-api',{
    useNewUrlparser:true
})

module.exports=mongoose
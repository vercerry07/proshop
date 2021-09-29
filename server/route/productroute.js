let express = require('express')
let productrouter = express.Router()


let products = require('../data/products')
let asynchandler = require('express-async-handler')
let Product = require('../model/product')
productrouter.get('/',asynchandler (async(req,res)=>{
       let product = await Product.find({})
       res.json(product)

}))

productrouter.get('/:id', asynchandler( async(req,res)=>{
       let product = await Product.findById(req.params.id)
       if(product){
       
       
       
       
        res.json(product)    
       
    }
    else {
        res.status(404).json({
            msg:'no product found'
        })
    }

}))

module.exports = productrouter
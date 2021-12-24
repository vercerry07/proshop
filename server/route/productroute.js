let express = require('express')
let productrouter = express.Router()


let products = require('../data/products')
let Order = require('../model/ordermodel')
let asynchandler = require('express-async-handler')
let Product = require('../model/product')
let protect = require('../middleware/authmiddleware') 
let admincheck = require('../middleware/adminmiddleware')

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

productrouter.delete('/:id', protect, admincheck, asynchandler( async(req,res)=>{
 
    let product = await Product.findByIdAndDelete(req.params.id)
       if(product){      
        res.json({
            message:'product deleted'
        })    
       
    }
    else {
        res.status(404).json({
            msg:'no product found'
        })
    }
}))

productrouter.post('/createproduct', protect, admincheck, asynchandler( async(req,res)=>{
 
    let product = new Product({
      name:'test product',
      price:1,
      
      
      user: req.user._id,
      image: '/images/sample.png',

      category:'sample catagory',
      numReviews:2,
      description:'desription',
      brand:'test brand',
      countInStock:1
    })
     let creatredproduct = await product.save()
     if(creatredproduct){
        
        
        res.json(creatredproduct)
     
    }
  else {
      res.status(401).json({
          message:'product can not be created'
      })
  }
}))

productrouter.put('/createproduct/:id', protect, admincheck, asynchandler( async(req,res)=>{
 
    let product_id = req.params.id
    let {name, price, description, image, brand, category, countInStock} = req.body
    let product = await Product.findById(product_id)
    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        
        
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        let editproduct = await product.save()
        res.json(editproduct)    
    }
    else {
        res.status(404)
        throw new Error('product not found') 
    }


}))
// productrouter.post('/order', Protect,async(req,res)=>{

//     let {orderitem, shippingaddress, paymentmethod, itemPrice, taxPrice, shippingPrice, totalPrice} = req.body
//     if(orderitem.length === 0 ){
//        res.status(400)
//        throw new Error('no order item')
    
    
//     }
//     else {
//         let order = new Order({
//             orderitem,
//             shippingaddress, 
//             paymentmethod, 
//             itemPrice, 
//             taxPrice, 
//             shippingPrice, 
            
//             totalPrice,
//             user:req.user._id 
//         })
//        let createdorder = await order.save()
//        if(createdorder){
      
      
//         res.status(201).json(createdorder)
//        }
 
//       else {
//           res.status(400)

//           throw new Error('order can not be saved')
//       } 
       
//     } 
// })

module.exports = productrouter
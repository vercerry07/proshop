let express = require('express')
let productrouter = express.Router()


let products = require('../data/products')
let Order = require('../model/ordermodel')
let asynchandler = require('express-async-handler')
let Product = require('../model/product')
let Protect = require('../middleware/authmiddleware')
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
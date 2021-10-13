let express = require('express')
let orderroute = express.Router()


let Order = require('../model/ordermodel')
// let asynchandler = require('express-async-handler')
let Product = require('../model/product')
let Protect = require('../middleware/authmiddleware')
orderroute.post('/', Protect,async(req,res)=>{
    let {orderitem, shippingaddress, paymentmethod, itemPrice, taxPrice, shippingPrice, totalPrice} = req.body
    
    if(orderitem.length === 0 ){
    
        res.status(400)
       throw new Error('no order item')
    }




    else {
    
        let order = new Order({ 
            orderItems: orderitem,
            shippingAddress:shippingaddress, 
            paymentMethod: paymentmethod, 
            itemPrice, 
            taxPrice, 
            shippingPrice, 
            
            totalPrice,
            user:req.user._id 
        
        })
       let createdorder = await order.save()
       if(createdorder){
      
      
        
        res.status(201).json(createdorder)
       }
      else {
          res.status(400)

          throw new Error('order can not be saved')
      }        
    } 
})

module.exports = orderroute
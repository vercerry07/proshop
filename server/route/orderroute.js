let express = require('express')
let orderroute = express.Router()


let Order = require('../model/ordermodel')
let asynchandler = require('express-async-handler')
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

orderroute.get('/:id', Protect,async(req,res)=>{
     
    let order = await Order.findById(req.params.id).populate('user', 'name email')     
    
    if(order){
     
    
        res.json(order)
    }

    else {
        res.status(404)
        throw new Error('order not found')
    }
    })


    
orderroute.put('/:id/pay', Protect,async(req,res)=>{
     
        let order = await Order.findById(req.params.id)
        if(order){
         order.isPaid = true
         order.paidAt = Date.now()
         order.paymentResult = {
             id: req.body.id,
             status: req.body.status,

             update_time: req.body.update_time,

             email_address: req.body.payer.email_address
         }   
         let updatedorder = await order.save()
        
         res.json(updatedorder) 
        }
        
        else {
            res.status(404)
            throw new Error('order not found')
        }
        })    
// orderroute.get('/userorder', Protect,asynchandler(async(req,res)=>{
//        try {
//         const orders = await Order.findById(req.user._id)
//         res.json(orders)
//                 }        
//                 catch (error) {
//                 console.log(error)           
//                 } 
//             }     
        
module.exports = orderroute 
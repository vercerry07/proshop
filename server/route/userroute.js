let express = require('express')
let userroute = express.Router()


let User = require('../model/usermodel')
let asynchandler = require('express-async-handler')
let generatetoken = require('../util/token')
let protect = require('../middleware/authmiddleware')
let bcrypt = require('bcryptjs')
userroute.get('/',(req,res)=>{

  res.send('hello')

})
userroute.post('/login',asynchandler( async(req,res)=>{
  let {email, password} = req.body  
  let user = await User.findOne({email})
 
 
 
  if(user && (await user.matchpassword(password))){
    
   res.json({
    _id:user._id, 
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token: generatetoken(user._id)
  
  })
  
} 

else {
  
  res.status(401)
  throw new Error('wrong credential')
}
}))



userroute.get('/profile', protect,async(req,res)=>{

    
  
  let user = await User.findById(req.user._id) 
  if(user){
    res.json({
      _id:user._id, 
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      token: generatetoken(user._id)
    })  
  
  
  }
  else {

    res.status(401)
    throw new Error('user not found')
  }
  res.send('hello')     
})



userroute.post('/', async(req,res)=>{

  let { name, email ,password} = req.body  
  let exuser = await User.findOne({email})
  if(!exuser){
        let pwd = await bcrypt.hash(password, 10)
        let ruser = await User({
         name,
         email,
         password:pwd
        })
   
      if(ruser){
       res.status(201).json({
        _id:user._id, 
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token: generatetoken(user._id)
       }) 
      
      
      }
      else {
        res.status(400)
        throw new Error('user can not be saved')
      }
    
} 

else {
  res.status(400)
  throw new Error('user exists')
  
}      
})
module.exports = userroute
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
 
 
 
  if(user){
    if(bcrypt.compare(password, user.password)){

   res.json({
    _id:user._id, 
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token: generatetoken(user._id)
  
  })
}
    
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

  // res.send('hello')     
})


userroute.put('/profile', protect,async(req,res)=>{
  
  let user = await User.findById(req.user._id) 
  if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
      user.password = req.body.password
    }     

    let updateduser = await user.save() 
    
    res.json({
      _id:updateduser._id, 
      name:updateduser.name,
      email:updateduser.email,
      isAdmin:updateduser.isAdmin,
      token: generatetoken(updateduser._id)   
    })
  }
  

  else {

    res.status(401)
    throw new Error('user not found')
  }

       
})

userroute.post('/', asynchandler( async(req,res)=>{

  let { name, email ,password} = req.body  
  let exuser = await User.findOne({email})
  if(!exuser){
        let pwd = await bcrypt.hash(password, 10)
        let ruser = await User({
         name,
         email,

         password:pwd
        })
      
        await ruser.save()
      
      if(ruser){
       res.status(201).json({
        _id:ruser._id, 
      
      
      
      
        name:ruser.name,
      
        email:ruser.email,
        isAdmin:ruser.isAdmin,
        token: generatetoken(ruser._id)
       }) 
      }
      else {
        
        res.status(400)
        throw new Error('user can not be saved')
      } 

    } 
else {
  throw new Error('user exists') 
}      


}))

module.exports = userroute
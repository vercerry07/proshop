let express = require('express')
let userroute = express.Router()


let User = require('../model/usermodel')
let asynchandler = require('express-async-handler')
let generatetoken = require('../util/token')
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


module.exports = userroute
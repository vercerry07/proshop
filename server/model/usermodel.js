let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')


let userschema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    isAdmin:{type:Boolean, required:true, default:false}     
}, 

{

    timestamps: true
}
)






userschema.methods.matchpassword = async function (enteredpassword){
  return await bcrypt.compare(enteredpassword, this.password)  
}
let User = mongoose.model('User',userschema)
module.exports = User
let mongoose = require('mongoose')
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




let User = mongoose.model('User',userschema)

module.exports = User
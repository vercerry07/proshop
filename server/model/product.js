let mongoose = require('mongoose') 
let reviewschema = mongoose.Schema({


  name:{type:String, required:true},
  rating:{type:Number, required:true},   
  comment:{type:String, required:true}   
  
},{
    timestamps:true    

})

let productchema = mongoose.Schema({
    user:{
       type: mongoose.Schema.Types.ObjectId,
      
      
       required:true,
       ref:'User' 
    },
   
    name:{type:String, required:true},
    image:{type:String, required:true}, 
    brand:{type:String, required:true},
    category:{type:String, required:true},
    description:{type:String, required:true},
    
    
    reviews:[reviewschema],
    rating:{type:Number, required:true, default:0},
    numReviews:{type:Number, required:true, default:0},
   
    price:{type:Number, required:true, default:0},  
    CountInStock:{type:Number, required:true, default:0}, 
}, 
{


    timestamps: true

}
)


let Product = mongoose.model('Product',productchema)
module.exports = Product
let mongoose = require('mongoose')
let dotenv = require('dotenv')


let users = require('./data/user')
let products = require('./data/products')
let User = require('./model/usermodel')
let Product = require('./model/product')
let Order = require('./model/ordermodel')
dotenv.config()



mongoose.connect(process.env.mongourl).then(()=>{
      console.log('db connected')    
}).catch((err)=>{


    console.log(err)

})

let importdata = async()=>{
    try {
      await Order.deleteMany()  
      await Product.deleteMany()  
      await User.deleteMany()  
      
      
      let createduser = await User.insertMany(users)   
      let adminuser = createduser[0]._id 
      let sampleproduct = products.map((product)=> {
          return {
              ...product, user: adminuser
          }
      }) 
      await Product.insertMany(sampleproduct)
      console.log('data imported')
      
      process.exit()
    } catch (err) {
       console.log(err)
       process.exit(1) 
    
    }
}
let removedata = async()=>{
    try {
     
      await Order.deleteMany()  
      await Product.deleteMany()  
      await User.deleteMany()  
      
      console.log('data removed')
      
      
      process.exit()
    } catch (err) {
     
     
        console.log(err)
       process.exit(1) 
    
    }
}


if(process.argv[2] === '-d'){
  
    removedata()
}  
else {
    importdata()
}
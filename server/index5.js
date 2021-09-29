require('dotenv').config()
let express = require('express')


let mongoose = require('mongoose')
let app = express()
mongoose.connect(process.env.mongourl).then(()=>{
      console.log('mongo connected')    
}).catch((err)=>{
      console.log(err)
     
      process.exit(1)

})
app.get('/',(req,res)=>{
   res.send('hello')




})

app.listen(3200,console.log('server start'))
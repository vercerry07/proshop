require('dotenv').config()
let express = require('express')


let mongoose = require('mongoose')
let productroute = require('./route/productroute')
let cors = require('cors')
const userroute = require('./route/userroute')
let errorhandler = require('./middleware/errormiddleware')
let app = express()

app.use(cors())

mongoose.connect(process.env.mongourl).then(()=>{
    console.log('mongo connected')    
    }).catch((err)=>{
    
    
        console.log(err)     
          
    process.exit(1)

 })
app.use(errorhandler)
app.use(express.json()) 
app.use('/api/products', productroute)
app.use('/api/user', userroute)
app.get('/',(req,res)=>{    
 
    res.send('hello')

})

app.listen(3200,console.log('server start'))
let express = require('express')
let multer = require('multer')


let path = require('path')
let uploadroute = express.Router()
let storage = multer.diskStorage({
       destination(req, file, cb) {
           cb(null, 'upload/')
       },
      
       filename(req, file, cb) {
          
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
       }
})


function checkFiletype(file, cb) {
 let filetypes = /jpg|png/
 let extname = filetypes.test(path.extname(file.originalname.toLowerCase()))

 let mimetype = filetypes.test(file.mimetype)
 if(extname && mimetype){
    return cb(null, true)
 }
 else {
     cb('images only')
 }

}
let upload = multer({

    storage,
    fileFilter: function(req, file, cb) {
      checkFiletype(file, cb)
    }
})

uploadroute.post('/', upload.single('image'),(req,res)=>{
  res.send(`${req.file.path}`)
})



module.exports = uploadroute
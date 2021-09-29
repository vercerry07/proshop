let bcrypt = require('bcryptjs')
let users = [
  
  
    {
  name:'admin user',
  email:'admin@yahoo.com',
  password: bcrypt.hashSync('123456', 10),
  isAdmin:true
  },
  
  {

    name:'robert',
    email:'abc12@yahoo.com',
    password:bcrypt.hashSync('123456', 10),
    



},

]
module.exports = users
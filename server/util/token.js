let jwt = require('jsonwebtoken')
let generatetoken = (id)=>{


     return jwt.sign({ id}, process.env.jwtkey, {
         expiresIn: '1h'
     })    
}

module.exports = generatetoken
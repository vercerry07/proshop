let jwt = require('jsonwebtoken')
let generatetoken = (id)=>{


     return jwt.sign({ id}, 'abc123', {
         expiresIn: '1h'
     })    
}

module.exports = generatetoken
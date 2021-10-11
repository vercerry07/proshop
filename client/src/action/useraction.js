import axios from 'axios'
export let userlogin = (email,password)=> async(dispatch)=>{


    try {
       dispatch({type:'USER_LOGIN_REQUEST'}) 
       let config = {
         headers: {
             'Content-Type':'application/json'
         }  
       
        }

       let {data} = await axios.post('/api/user/login', {email, password}, config)
       dispatch({type:'USER_LOGIN_SUCCESS', payload:data})
       localStorage.setItem('userinfo', JSON.stringify(data))
    
    
     
    
    } catch (err) {      
    
        dispatch({type:'USER_LOGIN_FAIL', payload:err.responce && err.responce.data.message ? 
        err.responce.data.message : err.message
      
       })
    }  




}

export let userlogout = ()=>async(dispatch)=>{
  
  localStorage.removeItem('userinfo')  
  dispatch({type:'USER_LOGOUT'})    
}

export let userregister = (name, email,password)=> async(dispatch)=>{
 
  try {
     dispatch({type:'USER_REGISTER_REQUEST'}) 
 
     let config = {
       headers: {
           'Content-Type':'application/json'
       }  
     
      }

     let {data} = await axios.post('/api/user', {name, email, password}, config)
     dispatch({type:'USER_REGISTER_SUCCESS', payload:data})
     dispatch({type:'USER_LOGIN_SUCCESS', payload:data})
     
     
     localStorage.setItem('userinfo', JSON.stringify(data))
  
  
  } catch (err) {      
      dispatch({type:'USER_REGISTER_FAIL', payload:err.responce && err.responce.data.message ? 
     
      err.responce.data.message : err.message
     })
  }  




}
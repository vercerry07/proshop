import axios from 'axios'
export let createorder = (order)=> async(dispatch, getState)=>{
 

    try {
       dispatch({type:'ORDER_CREATE_REQUEST'})    
       let { userlogin: {userinfo}, } = getState()
       let config = {
         headers: {
             'Content-Type':'application/json',

             Authorization: `Bearer ${userinfo.token}`
         }  
       
        }
  
       let {data} = await axios.post('/api/order', order, config)
       dispatch({type:'ORDER_CREATE_SUCCESS', payload:data})
    } catch (err) {      
        
        
        
        
        dispatch({type:'ORDER_CREATE_FAIL', payload:err.responce && err.responce.data.message ? 
       
        err.responce.data.message : err.message
    })
    }
}  
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

export let userdetail = (id)=> async(dispatch, getState)=>{
 
  try {
     dispatch({type:'USER_DETAIL_REQUEST'}) 
     let {userlogin: { userinfo}} = getState() 

     let config = {
       headers: {
           'Content-Type':'application/json',
           Authorization: `Bearer ${userinfo.token}`
       }  
      
      }
     let {data} = await axios.get(`/api/user/${id}`, config)
     dispatch({type:'USER_DETAIL_SUCCESS', payload:data})
    //  dispatch({type:'USER_LOGIN_SUCCESS', payload:data})
     
     
    //  localStorage.setItem('userinfo', JSON.stringify(data))
  
  
  } catch (err) {      
      dispatch({type:'USER_DETAIL_FAIL', payload:err.responce && err.responce.data.message ? 
     
      err.responce.data.message : err.message
     })
  }  



}


export let updateprofile = (user)=> async(dispatch, getState)=>{
  try {
    dispatch({type:'USER_PROFILE_REQUEST'}) 
     
    let {userlogin: { userinfo}} = getState() 

     let config = {
       headers: {
           'Content-Type':'application/json',
           Authorization: `Bearer ${userinfo.token}`
       }  
      }
    
    
    
    
    
    
    
      let {data} = await axios.put(`/api/user/profile`,user, config)
     dispatch({type:'USER_PROFILE_SUCCESS', payload:data})
  } catch (err) {      
      dispatch({type:'USER_PROFILE_FAIL', payload:err.responce && err.responce.data.message ? 
      err.responce.data.message : err.message
     
    })
  }  
}

export let listuser = ()=> async(dispatch, getState)=>{
  try {
    dispatch({type:'USER_LIST_REQUEST'}) 
     
    let {userlogin: { userinfo}} = getState() 

     let config = {
       headers: {
           Authorization: `Bearer ${userinfo.token}`
       }  
      
      
      }
      let {data} = await axios.get(`/api/user/`, config)
     dispatch({type:'USER_LIST_SUCCESS', payload:data})

    } catch (err) {      

      dispatch({type:'USER_LIST_FAIL', payload:err.responce && err.responce.data.message ? 
      err.responce.data.message : err.message     
    })
  }  

}


export let userdelete = (id)=> async(dispatch, getState)=>{
  try {
    dispatch({type:'USER_DELETE_REQUEST'}) 
    let {userlogin: { userinfo}} = getState() 
     let config = {
       headers: {
       
        Authorization: `Bearer ${userinfo.token}`
       }  
      
      }
      let {data} = await axios.delete(`/api/user/${id}`, config)
     dispatch({type:'USER_DELETE_SUCCESS', payload:data})
  } catch (err) {      
      dispatch({type:'USER_DELETE_FAIL', payload:err.responce && err.responce.data.message ? 
      err.responce.data.message : err.message    
    })
  
  }  

}

export let userupdate = (user)=> async(dispatch, getState)=>{
  try {
    dispatch({type:'USER_UPDATE_REQUEST'}) 
    let {userlogin: { userinfo}} = getState() 
     let config = {
       headers: {
       

        'Content-Type':'application/json',
        Authorization: `Bearer ${userinfo.token}`
       }  
      
      }
      let {data} = await axios.put(`/api/user/${user._id}`,user, config)
     dispatch({type:'USER_UPDATE_SUCCESS'})
     dispatch({type:'USER_DETAIL_SUCCESS', payload:data})
     
    } catch (err) {      
      dispatch({type:'USER_UPDATE_FAIL', payload:err.responce && err.responce.data.message ? 
      err.responce.data.message : err.message    
    })
  
  }  

}
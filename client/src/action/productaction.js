import axios from 'axios'
export let listproduct = ()=> async(dispatch)=>{


    try {
    dispatch({type:'PRODUCT_LIST_REQUEST'})
     let {data} = await axios.get('/api/products')
     dispatch({type:'PRODUCT_LIST_SUCCESS',payload:data})
     } 
catch (err) {
        
    dispatch({type:'PRODUCT_LIST_FAIL', payload:err.responce && err.responce.data.message ? 
    
    err.responce.data.message : err.message
    })
  }  




}

export let listproductdetail = (id)=> async(dispatch)=>{
  try {
  dispatch({type:'PRODUCT_DETAIL_REQUEST'})
   let {data} = await axios.get(`/api/products/${id}`)
   dispatch({type:'PRODUCT_DETAIL_SUCCESS',payload:data})
   } 

catch (err) {    
  dispatch({type:'PRODUCT_DETAIL_FAIL', payload:err.responce && err.responce.data.message ? 
  err.responce.data.message : err.message

 })
}  




}

export let productdelete = (id)=> async(dispatch, getState)=>{
  try {
    
    
    let {userlogin: { userinfo}} = getState() 
    let config = {
      headers: {
      

       'Content-Type':'application/json',
       Authorization: `Bearer ${userinfo.token}`
      }  
     
     }
  dispatch({type:'PRODUCT_DELETE_REQUEST'})
   await axios.delete(`/api/products/${id}`, config)
   dispatch({type:'PRODUCT_DELETE_SUCCESS'})
   } 

   
catch (err) {    
  dispatch({type:'PRODUCT_DELETE_FAIL', payload:err.responce && err.responce.data.message ? 
  err.responce.data.message : err.message
 })

}  




}

export let productcreate = ()=> async(dispatch, getState)=>{
  try {
    
    
    let {userlogin: { userinfo}} = getState() 
    let config = {
      headers: {
       'Content-Type':'application/json',
       Authorization: `Bearer ${userinfo.token}`
      }  
     
     }
  dispatch({type:'PRODUCT_CREATE_REQUEST'})
  let {data} = await axios.post(`/api/products/createproduct`,{}, config)
  
  
  dispatch({type:'PRODUCT_CREATE_SUCCESS', payload:data})
  
   } 

catch (err) {    
  dispatch({type:'PRODUCT_CREATE_FAIL', payload:err.responce && err.responce.data.message ? 
  err.responce.data.message : err.message
 })

}  





}
export let productupdate = (product)=> async(dispatch, getState)=>{
  try {
    
    
    let {userlogin: { userinfo}} = getState() 
    let config = {
      headers: {
       'Content-Type':'application/json',
       Authorization: `Bearer ${userinfo.token}`
      }  
     
     }
  dispatch({type:'PRODUCT_UPDATE_REQUEST'})
  let {data} = await axios.put(`/api/products/createproduct/${product._id}`,product, config)
  
  

  dispatch({type:'PRODUCT_UPDATE_SUCCESS', payload:data})
  
   } 

catch (err) {    
  dispatch({type:'PRODUCT_UPDATE_FAIL', payload:err.responce && err.responce.data.message ? 
  err.responce.data.message : err.message
 })

}  

}
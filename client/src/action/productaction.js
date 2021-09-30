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
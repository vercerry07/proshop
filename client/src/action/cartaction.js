import axios from 'axios'
export let addtocart = (id,qty)=>async(dispatch, getState)=>{


    try { 
     let { data} = await axios.get(`/api/products/${id}`)
     dispatch({type:'CART_ADD_ITEM', payload:{
         product: data._id,
         name:data.name,
         image:data.image,

         price:data.price,

         countInStock:data.countInStock,
         qty:qty
     }})   


     localStorage.setItem('cartitem', JSON.stringify(getState().cart.cartitem))

    }
    
    catch (err) {
    console.log(err)     
  }
}
export let removefromcart = (id)=>async(dispatch, getState)=>{
     dispatch({type:'CART_REMOVE_ITEM', payload:id} )

     localStorage.setItem('cartitem', JSON.stringify(getState().cart.cartitem))

}

export let saveshippingaddress = (data)=>async(dispatch)=>{
  dispatch({type:'CART_SAVE_SHIPPING', payload:data} )
  localStorage.setItem('shippingaddress', JSON.stringify(data))


  
}

export let savepaymentmethod = (data)=>async(dispatch)=>{
  
  
  
  dispatch({type:'CART_SAVE_PAYMENT', payload:data} )
  localStorage.setItem('paymentmethod', JSON.stringify(data))


}
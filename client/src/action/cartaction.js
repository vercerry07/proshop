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
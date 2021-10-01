export let cartreducer = (state = { cartitem:[]},action)=>{
  switch (action.type) {
      
    
    case 'CART_ADD_ITEM':
        let item = action.payload 
        let existsitem = state.cartitem.find(x => x.product === item.product)
        if(existsitem) {
           return {
               ...state,

               cartitem: state.cartitem.map(x => x.product === existsitem.product ? item : x)
         
            }
        }
        else {

          return {
              ...state,
              cartitem: [...state.cartitem, item]
          }  
    
        }
      default:
          return state
     }  
}
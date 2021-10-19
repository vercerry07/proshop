export let orderreducer = (state = {},action)=>{
     switch (action.type) {
         
        
        case 'ORDER_CREATE_REQUEST':
             return {
                 loading:true
             }
        case 'ORDER_CREATE_SUCCESS':
                return {
                    
                    loading:false,
                    
                    success: true, 
                    order:action.payload
                }
        
                
        
                
        case 'ORDER_CREATE_FAIL':
                   
                    return {
                        loading:false,
                        error:action.payload
                    }

        default:
             return state
     }

}







export let orderdetailreducer = (state = {loading:true , orderitem:[], shippingaddress: {}},action)=>{
    switch (action.type) {
       case 'ORDER_DETAIL_REQUEST':
            return {
                ...state,
                loading:true
            }
       case 'ORDER_DETAIL_SUCCESS':
               return {
                   
                   loading:false,
                   
                   order:action.payload
               }
                  
       case 'ORDER_DETAIL_FAIL':
                  
                   return {
                       loading:false,
                       error:action.payload
                   }
                   
       default:
            return state
 
        }


}

export let orderpayreducer = (state = {},action)=>{
    switch (action.type) {
       case 'ORDER_PAY_REQUEST':
            return {
                loading:true
            }
       case 'ORDER_PAY_SUCCESS':
               
             return {
                   
                loading:false,   
                   success:true
               }
       case 'ORDER_PAY_FAIL':          
                   return {
                       loading:false,
                       error:action.payload
                   }


        case 'ORDER_PAY_RESET':
        
                    return { }
                     
       default:
            return state
 
        }
}



export let orderlistreducer = (state = { order:[]},action)=>{
    switch (action.type) {
       case 'USER_ORDER_REQUEST':
            return {
                loading:true
            }

       case 'USER_ORDER_SUCCESS':   
             return {
                   
                   loading:false,   
                   order:action.payload               }
       case 'USER_ORDER_FAIL':          
                   return {
                       loading:false,
                       error:action.payload
                   }




                   
       default:
            return state
        }
}
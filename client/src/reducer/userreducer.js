export let userloginreducer = (state= {}, action)=>{
    switch (action.type) {
        
      
      case 'USER_LOGIN_REQUEST':
          return { loading:true}  
      case  'USER_LOGIN_SUCCESS':
              return { loading:false, userinfo: action.payload}  
      case 'USER_LOGIN_FAIL':
              return { loading:false, error: action.payload}  
        
      case 'USER_LOGOUT':

             return { }        
        default:
            return state
   
   
   
   
        }  
  
    }
export let userregisterreducer = (state= {}, action)=>{
        switch (action.type) {   
          case 'USER_REGISTER_REQUEST':
              return { loading:true}  
          case  'USER_REGISTER_SUCCESS':
              
              return { loading:false, userinfo: action.payload}  
          case 'USER_REGISTER_FAIL':
                  return { loading:false, error: action.payload}  
            
          case 'USER_LOGOUT':
    
                 return { }        
            default:
             
       
            return state   
            }  
        }

   
      
    export let userdetailreducer = (state= {  user:{}}, action)=>{
            switch (action.type) {   
              case 'USER_DETAIL_REQUEST':
                  return {...state, loading:true}  
              case  'USER_DETAIL_SUCCESS':
                  
                  return { loading:false, user: action.payload}  
              case 'USER_DETAIL_FAIL':
                      return { loading:false, error: action.payload}  
                
        
                
                
                
                    default:
                
                     return state   
                }  
            }      

        

    export let userupdateprofilereducer = (state= { }, action)=>{
               
        switch (action.type) {   
                  case 'USER_PROFILE_REQUEST':
                      return { loading:true}  
                  case  'USER_PROFILE_SUCCESS':
                      
                      return { loading:false, success:true ,userinfo: action.payload}  
                  case 'USER_PROFILE_FAIL':
        
                  return { loading:false, error: action.payload}  
                    
                        default:
                    
                         return state   
                    }  
                }      
    export let userlistreducer = (state= { users:[]}, action)=>{
               
                    switch (action.type) {   
                              case 'USER_LIST_REQUEST':
                                  return { loading:true}  
                              case  'USER_LIST_SUCCESS':
                                  
                                  return { loading:false ,users: action.payload}  
                              case 'USER_LIST_FAIL':
                              return { loading:false, error: action.payload}  
                                    default:
                                     return state   
                                }  
                    }      
    

                     
    export let userdeletereducer = (state= { }, action, getState)=>{
               

                    switch (action.type) {   
                                  case 'USER_DELETE_REQUEST':
                                      return { loading:true}  
        
                                  case  'USER_DELETE_SUCCESS':                              
                                      return { loading:false ,success:true}  
                                  
                                  case 'USER_DELETE_FAIL':
                                
                                      return { loading:false, error: action.payload}    
                                  default:
                                         return state   
                                  
                                  

                                  
                                        
                                        
                                        }  
                                
                                
                                    }                    
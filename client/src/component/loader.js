import React from 'react'
import {Spinner} from 'react-bootstrap'


const Loader = () => { 
    return (
        <div>
         <Spinner style={{width:'100px', height:'100px', margin:'auto', display:'block'}} animation='border' role='status'> 
          <span className='sr-only'>loading</span>   
        </Spinner>      
        
        </div>
    
    )
}
export default Loader
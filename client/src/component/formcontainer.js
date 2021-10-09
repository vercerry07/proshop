import React from 'react'
import {Row, Container, Col} from 'react-bootstrap'


const Formcontainer = ({children}) => {  
    return (
        <div>


        <Container>

         <Row className='justify-content-md-center'>
            
          <Col lg={12} md={6}> 
          {children}
          </Col>  
         
         
         
         
         </Row>   
        
        </Container>
        </div>
    
    )
}




export default Formcontainer
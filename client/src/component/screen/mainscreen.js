import React from 'react'
import product from '../../products'

 
import {Row, Col} from 'react-bootstrap'
import Product from '../product'
const Mainscreen = () => {
    return (
        <div>
          <h1>latest products</h1>
          <Row> 

  
        {product.map((p)=>(
         <Col sm={12} md={6} lg={4} xl={3}>
        {/* <h2>{p.name.name}</h2>  */}
         

         <Product product={p}/>


         </Col>
    ))}      
        </Row>  

        </div>

 )
}
export default Mainscreen
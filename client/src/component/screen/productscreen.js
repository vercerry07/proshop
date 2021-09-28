import React from 'react'
import {Link} from 'react-router-dom'


import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../rating'
import products from '../../products'
const Productscreen = ({match}) => {    
    let product = products.find((p)=>p._id === match.params.id)
    // console.log(product)

    return (
 
 <div>
    <Link className='btn btn-secondary my-2' to='/'>Go back</Link>         
    <Row> 
        
    
    <Col md={6} > 
    <Image src={product.image} alt={product.name} fluid/>   
    </Col>
    
    <Col md={3}>
    <ListGroup variant='flush'>
     <ListGroup.Item> <h2> {product.name} </h2></ListGroup.Item>   
    </ListGroup>
    </Col>
    </Row>   
 


        </div>
 
 )
}




export default Productscreen
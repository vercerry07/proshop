import React from 'react'
import {useDispatch, useSelector} from 'react-redux'


import {Link} from 'react-router-dom'
import Message from '../message'
import {Row, Col, ListGroup, Image, Button, Card} from 'react-bootstrap'
import {addtocart, removefromcart} from '../../action/cartaction'
const Placeorderscreen = () => {    
        let cart = useSelector(state => state.cart)
    
    return (
        
        <div>
        <Row>
        <Col>
        
        
        
        
        <ListGroup variant='flush'>

        <ListGroup.Item>
        <h2>shipping</h2>
        <p>
        <strong>Address:</strong>
         {cart.shipping.shippingaddress}, {cart.shipping.city} ,{cart.shipping.country} 
         {cart.shipping.postalcode}   
        </p>    
        </ListGroup.Item>    
        </ListGroup>

        </Col>    
        </Row>    
        </div>
    )
}




export default Placeorderscreen
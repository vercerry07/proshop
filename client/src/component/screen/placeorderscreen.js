import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'


import {Link} from 'react-router-dom'
import Message from '../message'
import {Row, Col, ListGroup, Image, Button, Card} from 'react-bootstrap'
import {createorder} from '../../action/orderaction'
const Placeorderscreen = ({history}) => {    
        let cart = useSelector(state => state.cart)        
   
        const orderr = useSelector(state => state.order) 

        let {order, success, error} = orderr
        const dispatch = useDispatch()
        useEffect(() => {
           

         if(success){
          
            history.push(`/order/${order._id}`)
         }
        }, [history, success])

        let placeorder = ()=>{
         dispatch(createorder({
            orderitem:cart.cartitem,

          
            shippingaddress: cart.shipping,
            paymentmethod: cart.paymentmethod,
            itemPrice:cart.itemPrice,
            
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice 
         }))
        }
        cart.itemPrice = cart.cartitem.reduce((acc, item)=> acc + item.price * item.qty, 0)
        cart.shippingPrice = cart.itemPrice > 100 ? 0 :10
        
       
        cart.taxPrice = Number((0.15 * cart.itemPrice).toFixed(2))
        
        cart.totalPrice = Number(cart.itemPrice + cart.shippingPrice + cart.taxPrice)  
         

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
        <ListGroup.Item>

        <h2>payment method</h2>
        <strong>method: </strong>
        {cart.paymentmethod}    
        </ListGroup.Item>  


        <ListGroup.Item>
        <h2>order item</h2>
        {cart.cartitem.length === 0 ? <Message>your cart is empty</Message>: 
        


        (
            <ListGroup>
            {cart.cartitem.map((item, index)=> (
             
             <ListGroup.Item key={index}>

              <Row>
              <Col md={1}>
               <Image src={item.image} alt={item.name} fluid></Image> 

               
               </Col>
               <Col>
               
               <Link to={`/product/${item.product}`}>    
               {item.name} 
              </Link> 
              </Col>
              <Col md={4}>
              {item.qty} x ${item.price} = ${item.qty * item.price}
              </Col>    
              </Row>   
             </ListGroup.Item>
            ))}    
            </ListGroup>
        )
        }    
        </ListGroup.Item>  
        </ListGroup>
        </Col>    
        <Col md={4}> 
        
        <Card>
           
            <ListGroup>
             
             <ListGroup.Item>
                <h2>order summary</h2> 
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
              <Col> 
              item
              </Col>
              <Col>{cart.itemPrice}</Col>           
                </Row> 
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
              <Col> 
              shipping
              </Col>
              <Col>{cart.shippingPrice}</Col>           
                </Row> 
             </ListGroup.Item>

             <ListGroup.Item>
                <Row>
              <Col> 
              
              tax
              </Col>
              <Col>{cart.taxPrice}</Col>           
                
                </Row> 
             </ListGroup.Item>
            
             <ListGroup.Item>
                <Row>
              <Col> 
              total
              </Col>
              <Col>{cart.totalPrice}</Col>           
                </Row> 
             </ListGroup.Item>
             <ListGroup.Item>



            <Button type='button' classname='btn-block' disabled={cart.cartitem === 0} onClick={placeorder}>place order</Button> 
             </ListGroup.Item>
            </ListGroup>
        </Card>
        </Col> 
        </Row>    
        </div>
    )
}




export default Placeorderscreen
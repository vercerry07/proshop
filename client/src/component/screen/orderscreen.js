import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'


import {Link} from 'react-router-dom'
import Message from '../message'
import Loader from '../loader'
import {Row, Col, ListGroup, Image, Button, Card} from 'react-bootstrap'
import {getorderdetail} from '../../action/orderaction'
const Orderscreen = ({match}) => {    

    let orderid = match.params.id

    const dispatch = useDispatch()
    let orderdetail = useSelector(state => state.orderdetail)        
        let {loading , order, error} = orderdetail
        
        
        if(!loading){
            order.itemPrice = order.orderItems.reduce((acc, item)=> acc + item.price * item.qty, 0)
        

        }
                
        useEffect(() => {
           
         dispatch(getorderdetail(orderid))
        }, [])
        
        return (
        loading ? <Loader /> : error ? <Message >{error}</Message> : 
       <>
       
       <h2>order {order._id}</h2>
       <Row>
        <Col md={8}>
        
        
        
        
        <ListGroup variant='flush'>
        <ListGroup.Item>
        <h2>shipping</h2>


        <p>
        <strong>name: </strong> {order.user.name}
        </p>
        
        <p>
        
        <strong>Email: </strong>
        <a href={`mailto: ${order.user.email}`}>{order.user.email}</a> 
        </p>
        <p>
        <strong>Address:</strong>
         {order.shippingAddress.address}, {order.shippingAddress.city}{' '} ,{order.shippingAddress.country} 
         {order.shippingAddress.postalcode}   
        
        </p>
        {order.isDelivered ? <Message variant='success'> delivered on {order.deliveredAt}</Message> : 
        <Message variant='success'> not delivered</Message>
        }    
        </ListGroup.Item> 
        <ListGroup.Item>

        <h2>payment method</h2>
        <p>
        <strong>method: </strong>
        {order.paymentMethod}    
        </p>

        {order.isPaid ? <Message variant='success'> Paid on {order.paidAt}</Message> : 
        <Message variant='success'> not paid</Message>
        }
        </ListGroup.Item>  


        <ListGroup.Item>
        <h2>order item</h2>
        {order.orderItems.length === 0 ? <Message>your cart is empty</Message>: 
        


        (
            <ListGroup>
            {order.orderItems.map((item, index)=> (
             
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
              <Col>{order.itemPrice}</Col>           
                </Row> 
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
              <Col> 
              shipping
              </Col>
              <Col>{order.shippingPrice}</Col>           
                </Row> 
             </ListGroup.Item>

             <ListGroup.Item>
                <Row>
              <Col> 
              
              tax
              </Col>
              <Col>{order.taxPrice}</Col>           
                
                </Row> 
             </ListGroup.Item>
            
             <ListGroup.Item>
                <Row>
              <Col> 
              total
              </Col>
              <Col>{order.totalPrice}</Col>           
                </Row> 
             </ListGroup.Item>
             {/* <ListGroup.Item>



            <Button type='button' classname='btn-block' disabled={cart.cartitem === 0} onClick={placeorder}>place order</Button> 
             </ListGroup.Item> */}
            </ListGroup>
        </Card>
        </Col> 
      
      
        </Row>    
       </> 
        
    )
}




export default Orderscreen
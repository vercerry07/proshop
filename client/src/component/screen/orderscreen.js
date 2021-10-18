import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'


import {Link} from 'react-router-dom'
import Message from '../message'
import Loader from '../loader'
import {Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {getorderdetail, payorder} from '../../action/orderaction'
import axios from 'axios'

import {PayPalButton} from 'react-paypal-button-v2'

const Orderscreen = ({match}) => {    
    let orderid = match.params.id
    const [sdkready, setsdkready] = useState(false)




    const dispatch = useDispatch()
        
    let orderdetail = useSelector(state => state.orderdetail)        
    let {loading , order, error} = orderdetail   
    let orderpay = useSelector(state => state.orderpay)        
    
    let {loading:loadingpay , success:successpay} = orderpay  
        if(!loading){
       
         order.itemPrice = order.orderItems.reduce((acc, item)=> acc + item.price * item.qty, 0) 
        }      
     
        useEffect(() => {  
         let addpaypalscript = async ()=>{
          let { data: clientid} = await axios.get('/api/config/paypal')
         let script = document.createElement('script')
         
         script.type = 'text/javascript'
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientid}`
         script.async = true
         script.onload = ()=> {
             setsdkready(true)
         
         }
         document.body.appendChild(script)   
             console.log(clientid)
         }
         // addpaypalscript()
        
         if(!order || successpay){
            
            dispatch({type:'ORDER_PAY_RESET'})
           
           dispatch(getorderdetail(orderid))
                     
         } 
         else if(!order.isPaid){
          if(!window.paypal){
          
          
            addpaypalscript()
          }

         else {
          setsdkready(true)   
         } 
         }
        }, [dispatch, orderid, successpay, order])


        let successPayment = (paymentresult)=>{
 
        console.log(paymentresult)
        dispatch(payorder(orderid, paymentresult))
        } 

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
             {!order.isPaid && (
                <ListGroup.Item>
                 {loadingpay && <Loader/>}
               
                 {!sdkready ? <Loader /> : 
        <PayPalButton amount={order.totalPrice} onSuccess={successPayment}/>
                                      
                 }  
                </ListGroup.Item>
             )}
            </ListGroup>
        </Card>
        </Col> 
      
         {/* <button>pay</button> */}
              
        </Row>    
       </> 
        
    )
}




export default Orderscreen
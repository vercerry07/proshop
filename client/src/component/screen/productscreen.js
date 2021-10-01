import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'


import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../rating'
import {useDispatch, useSelector} from 'react-redux'
import {listproductdetail} from '../../action/productaction'
import Loader from '../loader'
import Message from '../message'

const Productscreen = ({match, history}) => {    

    const dispatch = useDispatch()    
    useEffect(() => {        
        dispatch(listproductdetail(match.params.id))
   
   
    }, [dispatch, match])
   const productdetail = useSelector(state => state.productdetail) 
   let {loading, error, product} = productdetail 
      
   const [qty, setqty] = useState(0) 
   let addtocarthandler = ()=>{
       history.push(`/cart/${match.params.id}?qty=${qty}`)              
   } 
   return (
 <div>
    {loading ? <Loader /> : error ? <Message >{error}</Message>: 
    (
<div>

    <Link className='btn btn-secondary my-2' to='/'>Go back</Link>         
    <Row>  
    <Col md={6} > 
    
    <Image src={product.image} alt={product.name} fluid/>   
    </Col>
    <Col md={3}>
    <ListGroup variant='flush'>
     <ListGroup.Item> <h2> {product.name} </h2></ListGroup.Item>   
     <ListGroup.Item> <Rating value={product.rating} text={`${product.numReviews} reviews`} /> </ListGroup.Item> 
     <ListGroup.Item>Price ${product.price}</ListGroup.Item>
     <ListGroup.Item>Description {product.description}</ListGroup.Item>
      
    </ListGroup>
    </Col>
    <Col md={3}>


     <Card>         
     <ListGroup variant='flush'> 
      <ListGroup.Item>
       
       <Row>

        <Col>
        price 
       </Col>
       <Col>
         
      <strong>{product.price}</strong>
       </Col>   
        </Row>    
       </ListGroup.Item>   

       <ListGroup.Item>
       <Row>

        <Col>
        Status: 
       
       
       </Col>
       <Col>
       
        {product.countInStock > 0 ? 'in stock':'out of stock'}
       </Col>   
        </Row>    
      
       </ListGroup.Item>
      
        {product.countInStock > 0 &&
        <ListGroup.Item>
        <Row>
        <Col>
        <Form.Control as='select' value={qty} onChange={(e)=> setqty(e.target.value)}>
        {[...Array(product.countInStock).keys() ].map(x => (
            <option key={x+1} value={x + 1}> {x+1}</option>
        )) }   
        </Form.Control> 
        </Col>       
        </Row>       
 
        </ListGroup.Item>
        }
       <ListGroup.Item>
        <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addtocarthandler}>Add to cart</Button>
        </ListGroup.Item> 
    </ListGroup> 
     </Card>  
    </Col>
    </Row>
    </div>
    )
    }
       
        </div>
 

 )
}



export default Productscreen
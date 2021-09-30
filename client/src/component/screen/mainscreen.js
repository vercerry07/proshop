import React,{useEffect} from 'react'


  
import {Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../product'
import {listproduct} from '../../action/productaction'
import Message from '../message'
import Loader from '../loader'

const Mainscreen = () => {

  const dispatch = useDispatch()

  let productlist = useSelector(state => state.productlist)
  
  let {loading, error, products} = productlist
  useEffect(() => {      
    dispatch(listproduct())
  
  
  }, [dispatch])
  return (   
  <div>
    <h1>latest products</h1>     
  {loading ? <h2> 
    <Loader />
  
  </h2> : error ? (
    <Message variant='danger'>{error}</Message>
  ) : 
  
  <Row> 
   {products.map((p)=>(
  <Col sm={12} md={6} lg={4} xl={3}>
    <Product key={p._id} product={p}/>
    

    </Col>
))}      
   </Row>  
  }
         

    </div>
 )
}

export default Mainscreen
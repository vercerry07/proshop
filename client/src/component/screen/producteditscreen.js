import React,{useEffect, useState} from 'react'
import { Link} from 'react-router-dom'


import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../message'
import Loader from '../loader'
import Formcontainer from '../formcontainer'
import axios from 'axios'

import {listproductdetail, productupdate} from '../../action/productaction'

const Producteditscreen = ({match, history}) => { 

    let productid = match.params.id    
    const [name, setname] = useState('')
    const [price, setprice] = useState('')
    

    const [image, setimage] = useState('')   
    
    const [brand, setbrand] = useState('')

    const [category, setcategory] = useState('')
    const [countInStock, setcountInStock] = useState(0)
    const [description, setdesription] = useState('')
    const [upload, setupload] = useState(false)
    
    const productdetail = useSelector(state => state.productdetail)
    let {loading, product, error} = productdetail
    let productupdatee = useSelector((state)=> state.productupdate)
    
    let { loading:loadingupdate, success:successupdate, error:errorupdate} = productupdatee
    // const userupdatee = useSelector(state => state.userupdate)
    // let {loading:userloading, success, error:usererror} = userupdatee
    const dispatch = useDispatch()
    useEffect(() => { 
    
    if(successupdate){
        dispatch({type: 'PRODUCT_UPDATE_RESET'})
        history.push('/productlist')
    } 
    
    else {
      if(!product.name || product._id !== productid){
        dispatch(listproductdetail(productid))
      
      }
      else {
      
         setname(product.name)
        
         setprice(product.price)
         setimage(product.image)
         
         setbrand(product.brand)
         setcategory(product.category)
         setcountInStock(product.countInStock) 
         setdesription(product.description)
       
      }
    }
   
  }, [product, productid, dispatch, successupdate, history])
   let handlesubmit = (e)=>{
    e.preventDefault()
    // updateproduct 
    
    dispatch(productupdate({
      _id: productid,
      name,
      price,
      image,
      brand,
      category,

      countInStock, 
     
      description
    }))
  } 

 let uploadfilehandler = ()=>{
   
 }
  
return (


<>


<Link to='/productlist' className='btn btn-light my-2'>go back</Link>
<Formcontainer>
    <h2>edit product</h2>
   {loadingupdate && <Loader />}
    {errorupdate && <Message variant='danger'>{errorupdate}</Message>}
   {error && <Message variant='primary'>{error}</Message>}
   
   {/* {message  && <Message variant='primary'>{message}</Message>} */}
      
    <Form onSubmit={handlesubmit}>
     <Form.Group controlId='name'>
     <Form.Label>name</Form.Label>

     <Form.Control type='text' value={name} placeholder='enter name' onChange={(e)=> setname(e.target.value)}></Form.Control>     
     </Form.Group>        
    <Form.Group controlId='price'>
     <Form.Label>price</Form.Label>  
     <Form.Control type='number' value={price} placeholder='enter price' onChange={(e)=> setprice(e.target.value)}></Form.Control>     
     </Form.Group>
     <Form.Group controlId='image'>
     <Form.Label>image</Form.Label>  
     <Form.Control type='text' value={image} placeholder='enter price' onChange={(e)=> setimage(e.target.value)}></Form.Control>     
     
     <Form.File id='image-file' label='choose file' custom onChange={uploadfilehandler}></Form.File>
     {upload && <Loader />}
     </Form.Group>
     
     <Form.Group controlId='brand'>
     <Form.Label>brand</Form.Label>  
     <Form.Control type='text' value={brand} placeholder='enter brand' onChange={(e)=> setbrand(e.target.value)}></Form.Control>     
     </Form.Group>
     <Form.Group controlId='category'>
     <Form.Label>category</Form.Label>  
     <Form.Control type='text' value={category} placeholder='enter category' onChange={(e)=> setcategory(e.target.value)}></Form.Control>     
     </Form.Group>
     <Form.Group controlId='countinstock'>
     <Form.Label>countInStock</Form.Label>  
     <Form.Control type='number' value={countInStock} placeholder='enter countinstock' onChange={(e)=> setcountInStock(e.target.value)}></Form.Control>     
     </Form.Group>
     <Form.Group controlId='description'>
     
     <Form.Label>description</Form.Label>  
     <Form.Control type='text' value={description} placeholder='enter description' onChange={(e)=> setdesription(e.target.value)}></Form.Control>     
     </Form.Group>
     
     
    <Button type='submit' variant='primary'>update product</Button>
    </Form>
</Formcontainer>  

</>
 )

}

export default Producteditscreen
import React from 'react'
import { Card } from 'react-bootstrap'


const Product = ({product}) => { 
    return (
        <div>
    <Card className='my-2 p-3 rounded'>
      <a href={`/product/${product._id}`}>
      <Card.Img src={product.image} variant='top' />      
        
    </a>   
    
    <Card.Body>
    <a href={`/product/${product._id}`}>
    <Card.Title as='div'> <strong>{product.name}</strong> </Card.Title>
    
    
    </a>
    
    <Card.Text as='div'>
    
     <div className='my-2'>
         {product.rating} from {product.numReviews} reviews
     </div>
    </Card.Text>
    <Card.Text as='h3'>$ {product.price}</Card.Text>
    </Card.Body>
    
    </Card>           
        </div>
    )


}

export default Product
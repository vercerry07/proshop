import React, {useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'


import {useDispatch, useSelector} from 'react-redux'
import Formcontainer from '../formcontainer'
import {savepaymentmethod} from '../../action/cartaction'
const Paymentscreen = ({history}) => {
        
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()
    let {shipping} = cart 
    {!shipping && history.push('/shipping')}
    const [paymentmethod, setpaymentmethod] = useState('Paypal')
      
    
      
      let submithandler = (e)=>{    
        e.preventDefault()
        dispatch(savepaymentmethod(paymentmethod))
      
        history.push('/placeorder')
    } 
    
    return ( 
        <Formcontainer>   

      
      {/* <Checkoutstep Step1/>  */}
        <h2>payment method</h2>
        
    <Form onSubmit={submithandler}> 
     <Form.Group>


     <Form.Label as='legend'>select method</Form.Label>    
     <Col>
        
     <Form.Check type='radio' label='paypal or credit card' id='paypal' name='paymentmethod' value='paypal' onChange={(e)=> setpaymentmethod(e.target.value)} > </Form.Check>  
     
       </Col>
    </Form.Group>


    <Button type='submit' variant='primary'>continue</Button>    
     </Form>   
        </Formcontainer>  
   
   )

  }

  export default Paymentscreen
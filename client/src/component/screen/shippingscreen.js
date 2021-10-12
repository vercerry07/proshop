import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'


import {useDispatch, useSelector} from 'react-redux'
import Formcontainer from '../formcontainer'
import {userregister} from '../../action/useraction'
import {saveshippingaddress} from '../../action/cartaction'
import Checkoutstep from '../checkoutstep'
const Shippingscreen = ({history}) => {
        
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()
    let {shipping} = cart 
    const [address, setaddress] = useState(shipping.address)
      
    const [city, setcity] = useState(shipping.city)
      const [postalcode, setpostalcode] = useState(shipping.postalcode)
      const [country, setcountry] = useState(shipping.country)
      const [step1, setstep1] = useState(true)
      
      let submithandler = (e)=>{    
        e.preventDefault()
        dispatch(saveshippingaddress({address, city, postalcode, country}))
        history.push('/payment')
    } 
    // let step1=true 
      
    
    
    return (
        <Formcontainer>   

      
      {/* <Checkoutstep Step1/>  */}


        <h2>shipping</h2>
        
    <Form onSubmit={submithandler}> 
    <Form.Group controlId='address'>
     <Form.Label>Address</Form.Label>
     <Form.Control type='text' value={address} placeholder='enter address' onChange={(e)=> setaddress(e.target.value)} required></Form.Control>     
    </Form.Group>  
    <Form.Group controlId='city'>
  
     <Form.Label>city</Form.Label>
     <Form.Control type='text' value={city} placeholder='enter city' onChange={(e)=> setcity(e.target.value)} required></Form.Control>     
    </Form.Group>  

    <Form.Group controlId='postalcode'>
     <Form.Label>postalcode</Form.Label>
     <Form.Control type='text' value={postalcode} placeholder='enter postalcode' onChange={(e)=> setpostalcode(e.target.value)} required></Form.Control>     
    </Form.Group>
    <Form.Group controlId='country'>
     <Form.Label>country</Form.Label>
     
     <Form.Control type='text' value={country} placeholder='enter country' onChange={(e)=> setcountry(e.target.value)} required></Form.Control>     
    
    </Form.Group>
     
    <Button type='submit' variant='primary'>continue</Button> 
    
    
     </Form>   
        </Formcontainer>
   
   )
}


export default Shippingscreen
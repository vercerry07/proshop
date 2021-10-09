import React,{useEffect, useState} from 'react'
import { Link} from 'react-router-dom'


import {Row ,Col, Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../message'
import Loader from '../loader'
import Formcontainer from '../formcontainer'
import {userlogin} from '../../action/useraction'

const Loginscreen = ({location, history}) => { 

    const [email, setemail] = useState('')    
    const [password, setpassword] = useState('')
    let redirect = location.search ? location.search.split('=')[1] : '/'
   
   
    const userloginn = useSelector(state => state.userlogin)
    let {loading, userinfo, error} = userloginn
   useEffect(() => {
       
    if(userinfo){
       history.push(redirect)
       }
   }, [userinfo, history, redirect])
    const dispatch = useDispatch()
   let handlesubmit = (e)=>{
   
    
    e.preventDefault()
    dispatch(userlogin(email, password))
   
} 

return (
<Formcontainer>
   

   {error  && <Message variant='primary'>{error}</Message>}
   {loading && <Loader /> }
    <h2>Sign in</h2>
    
    <Form onSubmit={handlesubmit}>
    <Form.Group controlId='email'>
     <Form.Label>Email address</Form.Label>
     <Form.Control type='email' value={email} placeholder='enter email' onChange={(e)=> setemail(e.target.value)}></Form.Control>     
     </Form.Group>    
     <Form.Group controlId='password'>
     
     <Form.Label>Password</Form.Label>
     <Form.Control type='password' value={password} placeholder='enter password' onChange={(e)=> setpassword(e.target.value)}></Form.Control>     
     </Form.Group>
    
    <Button type='submit' variant='primary'>sign in</Button>
    </Form>
    <Row>
     <Col> new customer? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>register</Link></Col>   
    </Row>
</Formcontainer>
     


        
 )

}


export default Loginscreen
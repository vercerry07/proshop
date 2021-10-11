import React,{useEffect, useState} from 'react'
import { Link} from 'react-router-dom'


import {Row ,Col, Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../message'
import Loader from '../loader'
import Formcontainer from '../formcontainer'
import {userregister} from '../../action/useraction'

const Registerscreen = ({location, history}) => { 

    const [email, setemail] = useState('')    
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')
    
    
    const [cpassword, setcpassword] = useState('')
    
    const [message, setmessage] = useState('')
    
    let redirect = location.search ? location.search.split('=')[1] : '/'
   
    const userloginn = useSelector(state => state.userregister)
    let {loading, userinfo, error} = userloginn
   useEffect(() => {
       
    if(userinfo){
       history.push(redirect)
       }
   }, [userinfo, history, redirect])
    const dispatch = useDispatch()
   let handlesubmit = (e)=>{
   
    e.preventDefault()
    if(password !== cpassword){
      setmessage('entered password do not match')

    // return <Message variant='primary'>{message}</Message>     
    } 
    else if(!name || !email || !password || !cpassword){
      setmessage('please enter the required field')  
  
    }
    else {
    dispatch(userregister(name, email, password))
    } 


} 

return (
<Formcontainer>
   

   {error  && <Message variant='primary'>{error}</Message>}
   {message  && <Message variant='primary'>{message}</Message>}
   
   {loading && <Loader /> }
    <h2>Sign up</h2>
    <Form onSubmit={handlesubmit}>

     <Form.Group controlId='name'>
     <Form.Label>name</Form.Label>
    
     <Form.Control type='text' value={name} placeholder='enter name' onChange={(e)=> setname(e.target.value)}></Form.Control>     
     </Form.Group>        
    <Form.Group controlId='email'>
     <Form.Label>Email address</Form.Label>  
     <Form.Control type='email' value={email} placeholder='enter email' onChange={(e)=> setemail(e.target.value)}></Form.Control>     
     </Form.Group>    
     <Form.Group controlId='password'>
     
     <Form.Label>Password</Form.Label>
    
     <Form.Control type='password' value={password} placeholder='enter password' onChange={(e)=> setpassword(e.target.value)}></Form.Control>     
     </Form.Group>
     <Form.Group controlId='cpassword'>
     
     <Form.Label>confirm password</Form.Label>
     <Form.Control type='password' value={cpassword} placeholder='confirm password' onChange={(e)=> setcpassword(e.target.value)}></Form.Control>     
     </Form.Group>
    <Button type='submit' variant='primary'>register</Button>
    </Form>
    <Row>
     <Col> have an account ? <Link to={redirect ? `/signin?redirect=${redirect}`: '/signin'}>log in</Link></Col>   
    </Row>
</Formcontainer>        
 )
}


export default Registerscreen
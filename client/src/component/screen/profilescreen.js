import React,{useEffect, useState} from 'react'
import {Row ,Col, Form, Button, Table} from 'react-bootstrap'


import {useDispatch, useSelector} from 'react-redux'
import Message from '../message'
import Loader from '../loader'
import { userdetail, updateprofile} from '../../action/useraction'
import { userorder} from '../../action/orderaction'
import {LinkContainer} from 'react-router-bootstrap'

const Profilescreen = ({location, history}) => { 

  const [email, setemail] = useState('')    
    
    const [password, setpassword] = useState('')
    
    const [name, setname] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [message, setmessage] = useState('')
    



    let redirect = location.search ? location.search.split('=')[1] : '/'
    
    let dispatch = useDispatch()
    const userdeetail = useSelector(state => state.userdetail)
    let {loading, user, error} = userdeetail
    const userloogin = useSelector(state => state.userlogin)
    let {userinfo} = userloogin
   
   
   

    const orderlist = useSelector(state => state.orderlist)
    
    let {loading:loadingorder, order, error:errororder} = orderlist
   
    useEffect(() => {
       
    if(!userinfo){
       history.push('/login')
       }

      
      
       else {
           if(!user.name){
            dispatch(userdetail('profile')) 
            
            dispatch(userorder()) 
            
          }

     
           else {
             setname(user.name)
             setemail(user.email)

           }
       }
   }, [userinfo, history, dispatch, user])
   let handlesubmit = (e)=>{
   


    e.preventDefault()
    if(password !== cpassword){  
    
      setmessage('entered password do not match')
    
    } 

    // else if(!name || !email || !password || !cpassword){
    //   setmessage('please enter the required field')  
  
    // }
    else {
    
      dispatch(updateprofile({id:user._id, name, email, password}))
      alert('user updated')
    } 

} 
return (
 <div>
   <Row>
    <Col md={3}>
    {error  && <Message variant='primary'>{error}</Message>}
   {message  && <Message variant='primary'>{message}</Message>}
   
   {loading && <Loader /> }
    <h2>User profile</h2>
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
    <Button type='submit' variant='primary'>update</Button>
    </Form>
    </Col>   
    
    <Col md={9}>
        <h2> order</h2>



        {loadingorder ? <Loader /> : errororder ? <Message variant='primary'>{errororder}</Message> : 
        (
          <Table striped bordered responsive className='table-sm'>
            <thead>
              <tr>
                
                <th>id</th>
                <th>date</th>
                <th>total</th>
                <th>paid</th>
                <th>delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              
              {order.map((ordeer)=> (
                <tr key={ordeer.id}>
                  <td>{ordeer.createdAt.substring(0,10)}</td>
                  <td>{ordeer.totalPrice}</td>
                  
                  <td>{ordeer.isPaid ? order.paidAt.substring(0,10) : (
                    <i className='fas fa-time' style={{color:'red'}}></i>
                  ) }</td>
                  <td>{ordeer.isDelivered ? order.deliveredAt.substring(0,10) : (
                   
                   <i className='fas fa-time' style={{color:'red'}}></i>
                  ) }</td>
                  <td>

                  <LinkContainer to={`/order/${order._id}}`}>


                    <Button variant='light'>detail</Button>
                  </LinkContainer>
                  </td>
                  
                
                
                
                </tr>  
              ))}
            </tbody>
          </Table>
        )}
    </Col>
   </Row>
   

 
    {/* <Row>
     <Col> have an account ? <Link to={redirect ? `/signin?redirect=${redirect}`: '/signin'}>log in</Link></Col>   
    </Row> */}



</div>
)

}
export default Profilescreen
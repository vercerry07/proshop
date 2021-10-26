import React,{useEffect, useState} from 'react'
import { Link} from 'react-router-dom'


import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../message'
import Loader from '../loader'
import Formcontainer from '../formcontainer'
import {userdetail, userupdate} from '../../action/useraction'

const Usereditscreen = ({match, history}) => { 

    let userid = match.params.id
    const [email, setemail] = useState('')    
    const [name, setname] = useState('')
    

    const [message, setmessage] = useState('')
    
    const [isAdmin, setisAdmin] = useState(false)   
    
    const userdeetail = useSelector(state => state.userdetail)
    let {loading, user, error} = userdeetail
    
    const userupdatee = useSelector(state => state.userupdate)
    let {loading:userloading, success, error:usererror} = userupdatee
    const dispatch = useDispatch()
    
    useEffect(() => { 
    
    if(success){
     
      dispatch({type:'USER_UPDATE_RESET'})
      history.push('/userlist')
    }
    else {
     

      if(!user.name || user._id !== userid){
        dispatch(userdetail(userid))
     }
 
     else {
       setname(user.name)
      
       setemail(user.email)
        
       setisAdmin(user.isAdmin)
     
     }
    }
    
   
  }, [user, userid, dispatch, success])
   let handlesubmit = (e)=>{
   
    e.preventDefault()
   
    if(!name || !email){
      setmessage('please enter the required field')  
  
    }
    else {    
    dispatch(userupdate({ _id: userid, name, email, isAdmin}))
    
     } 
} 

return (


<>


<Link to='/userlist' className='btn btn-light my-2'>go back</Link>
<Formcontainer>
  
   {error && <Message variant='primary'>{error}</Message>}
   
   {message  && <Message variant='primary'>{message}</Message>}
   
   {loading || userloading && <Loader /> }
    <h2>edit user</h2>
   
   
    <Form onSubmit={handlesubmit}>

   
     <Form.Group controlId='name'>
     <Form.Label>name</Form.Label>
    
     <Form.Control type='text' value={name} placeholder='enter name' onChange={(e)=> setname(e.target.value)}></Form.Control>     
     </Form.Group>        
    <Form.Group controlId='email'>
     <Form.Label>Email address</Form.Label>  
     <Form.Control type='email' value={email} placeholder='enter email' onChange={(e)=> setemail(e.target.value)}></Form.Control>     
     </Form.Group>


     <Form.Group controlId= 'isadmin'>
     <Form.Label>is admin</Form.Label>  
     <Form.Check type='checkbox' checked={isAdmin} value={isAdmin} onChange={(e)=> setisAdmin(e.target.checked)}></Form.Check>     
     </Form.Group>    
     {/* <Form.Group controlId='password'>
     
     <Form.Label>Password</Form.Label>
    
     <Form.Control type='password' value={password} placeholder='enter password' onChange={(e)=> setpassword(e.target.value)}></Form.Control>     
     </Form.Group>
     <Form.Group controlId='cpassword'>
     
     <Form.Label>confirm password</Form.Label>
     <Form.Control type='password' value={cpassword} placeholder='confirm password' onChange={(e)=> setcpassword(e.target.value)}></Form.Control>     
     </Form.Group> */}
    <Button type='submit' variant='primary'>update</Button>
    
    
    </Form>
    



</Formcontainer>  
</>
 )
}




export default Usereditscreen
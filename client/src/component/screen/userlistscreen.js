import React, {useEffect} from 'react'
import {Table, Button} from 'react-bootstrap'


import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {listuser, userdelete} from '../../action/useraction'
import Loader from '../loader'
import Message from '../message'
const Userlistscreen = ({history}) => {
      
    const dispatch = useDispatch()

    const userlist = useSelector(state => state.userlist)
    let {loading, users, error} = userlist
    const userlogin = useSelector(state => state.userlogin)
    
    
    let {userinfo} = userlogin
    
    const userdeleete = useSelector(state => state.userdelete)
    
    let {success:successdelete} = userdeleete
    useEffect(() => {
      if(userinfo && userinfo.isAdmin){
      dispatch(listuser())        
      }
      else {
      
        history.push('/login')
      }
    }, [dispatch, history, successdelete, userinfo])
   
    let deleteuser= (id)=>{
      if(window.confirm('are you sure')){
        dispatch(userdelete(id))
       
      }
    
    }
    return (
        <div>
          <h2>user</h2>
          {loading ? <Loader />: error ? <Message variant='secondary'>{error}</Message> : (
              <Table striped bordered responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>admin</th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteuser(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
                {/* <tbody>
                    
                    {users.map((user)=>{

                      // {console.log(user)}
                      <tr key={user._id}>
                         <td>{user._id}</td> 
                         <td>{user.name}</td> 
                         <td><a href={`mailto ${user.email}`}>{user.email}</a> </td> 
                         <td>{user.isAdmin ? <i className='fas fa-check' style={{color:'green'}}></i>:<i className='fas fa-time' style={{color:'red'}}></i>}</td> 
                         <td>{user._id}</td> 
                         <td>
                         <LinkContainer to={`/user/${user._id}/edit`}>
                             
                             <Button variant='light' className='btn-sm'>

                                <i className='fas fa-edit'></i>   
                             </Button>
                         </LinkContainer>     


                             <Button variant='light' className='btn-sm' onClick={()=>deleteuser(user._id)}>


                              <i className='fa fa-trash'></i>

                             </Button>

                        </td> 
                      
                                              
                      </tr>
          })}
                </tbody> */}
              </Table>
          )}           
        </div>
    )




}

export default Userlistscreen
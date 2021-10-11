import React from 'react'
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'


import {LinkContainer} from 'react-router-bootstrap' 
import {useDispatch, useSelector} from 'react-redux'
import {userlogout} from '../action/useraction'
const Navbarr = () => {
  const userlogin = useSelector(state => state.userlogin) 
  let {userinfo} = userlogin

  const dispatch = useDispatch()

  let logouthandler = ()=>{

    dispatch(userlogout())
  }
  return (
  <div>

       <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>

  <Container>
  <LinkContainer to='/'>
  
    <Navbar.Brand>Proshop</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <LinkContainer to='/cart'>  

        <Nav.Link><i className='fas fa-shopping-cart'></i> cart</Nav.Link>
        </LinkContainer>
        {userinfo ? (
        <NavDropdown title={userinfo.name} id='username'> 
        
        <NavDropdown.Item>profile</NavDropdown.Item>
        <NavDropdown.Item onClick={logouthandler}>logout</NavDropdown.Item>
        </NavDropdown>  
        
        ) :(
           <LinkContainer to='/signin'> 
           <Nav.Link><i className='fas fa-user'></i> Sign in</Nav.Link>
           </LinkContainer>  
        )}
       

      </Nav>
    </Navbar.Collapse>
  </Container>


</Navbar>     
        </div>
    )
}


export default Navbarr
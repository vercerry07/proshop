import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'


const Navbarr = () => {
    return (
        <div>
       <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
  <Container>
    <Navbar.Brand href="/">Proshop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i> cart</Nav.Link>
        <Nav.Link href="/signin"><i className='fas fa-user'></i> Sign in</Nav.Link>
        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>     
        </div>
    )
}

export default Navbarr
import React from 'react'
import {Nav} from 'react-bootstrap'


import {LinkContainer} from 'react-router-bootstrap'
const Checkoutstep = ({Step1, step2, step3, step4}) => {    
    return (
        <Nav className='justify-content-center mb-4'>
         <Nav.Item>
         {Step1 ? (
          
          <LinkContainer>
           
           <Nav.Link to='/signin'>sign in</Nav.Link>
          </LinkContainer>   
         ):(<Nav.Link to='/' disabled>sign in</Nav.Link>)}    
         
         </Nav.Item>
         <Nav.Item>
         {step2 ? (
          
          <LinkContainer>
           
           <Nav.Link to='/shipping'>shipping</Nav.Link>
          </LinkContainer>   
         ): (<Nav.Link to='/' disabled>shipping</Nav.Link>)}    
         </Nav.Item>
         <Nav.Item>
         {step3 ? (
          
          <LinkContainer>
           
           <Nav.Link to='/payment'>payment</Nav.Link>
          </LinkContainer>   
         ):(<Nav.Link to='/' disabled>payment</Nav.Link>)}    
         </Nav.Item>
         <Nav.Item>
         {step4 ? (
          
          <LinkContainer>
           <Nav.Link to='/order'>order</Nav.Link>
          </LinkContainer>   
         ):(<Nav.Link to='/' disabled>order</Nav.Link>)}    
       
  
         </Nav.Item>
        </Nav>
  )

}

export default Checkoutstep
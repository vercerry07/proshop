import React, {useEffect} from 'react'
import { Table, Button, Row, Col} from 'react-bootstrap'


import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {listproduct, productdelete} from '../../action/productaction'
import Loader from '../loader'
import Message from '../message'
const Productlistscreen = ({history, match}) => {
      
    const dispatch = useDispatch()

    const productlist = useSelector(state => state.productlist)
    let {loading, products, error} = productlist
    const userlogin = useSelector(state => state.userlogin)
    
    
    let {userinfo} = userlogin
    
    const productdelete = useSelector(state => state.productdelete)
    
    let { success} = productdelete
    useEffect(() => {
    
        if(userinfo && userinfo.isAdmin){
      dispatch(listproduct())        
      }
    
      else {
      
        history.push('/login')
    
      }
    }, [dispatch, history, userinfo, success])
   
    let deleteproduct= (id)=>{
      if(window.confirm('are you sure')){
    
        dispatch(productdelete(id))
        
      }
    }


    let createproduct = ()=>{

    }
    return (
        <div>
            <Row className='align-items-center'>
             <Col>
             <h2>product</h2>
        
             <Col className='text-right'>
              <Button className='my-2' onClick={createproduct}> create product</Button>
             </Col>
             </Col>   
            </Row>
          
          {loading ? <Loader />: error ? <Message variant='secondary'>{error}</Message> : (
              <Table striped bordered responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>price</th>
                        <th>category</th>
                        <th>brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
            {products.map((produuct) => (
              <tr key={produuct._id}>
                <td>{produuct._id}</td>
                <td>{produuct.name}</td>
                <td>
                 {produuct.price} $ 
                </td>
                <td>
                  {produuct.category}
            
                </td>

                <td>
                  {produuct.brand}
            
                </td>
                <td>
                  <LinkContainer to={`/productlist/${produuct._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteproduct(produuct._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
                
              </Table>
          )}           
        </div>
    )



}
export default Productlistscreen
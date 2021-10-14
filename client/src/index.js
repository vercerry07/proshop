import React from 'react';
import ReactDOM from 'react-dom';


import './bootstrap.min.css'
import './index.css';
import App from './App';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'

import {Productlistreducer, Productdetailreducer} from './reducer/productreducer'
import {cartreducer} from './reducer/cartreducer'
import {userloginreducer, userregisterreducer, userdetailreducer, userupdateprofilereducer} from './reducer/userreducer'




import {orderreducer, orderdetailreducer} from './reducer/orderreducer'

let reducer = combineReducers({
  productlist:Productlistreducer,    
  productdetail:Productdetailreducer,
  cart:cartreducer, 
  userlogin:userloginreducer, 
  userregister:userregisterreducer,
  
  userdetail:userdetailreducer,
  userupdateprofile:userupdateprofilereducer,
  order:orderreducer,

  orderdetail:orderdetailreducer
})

let cartitemfromstorage = localStorage.getItem('cartitem') ? JSON.parse(localStorage.getItem('cartitem')) : []
let userinfofromstorage = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null
let shippingfromstorage = localStorage.getItem('shippingaddress') ? JSON.parse(localStorage.getItem('shippingaddress')) : {}

let intialstate = {  
  cart:{ cartitem:cartitemfromstorage, shipping:shippingfromstorage},
  userlogin:{ userinfo:userinfofromstorage},
}

let middleware = [thunk]
let store = createStore(reducer, intialstate, composeWithDevTools(applyMiddleware(...middleware)))
ReactDOM.render(

<React.StrictMode>    
    <Provider store={store}> 
    <App />      
    </Provider>
  </React.StrictMode>,
  

  document.getElementById('root')
 

 );
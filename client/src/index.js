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
import {userloginreducer} from './reducer/userreducer'




let reducer = combineReducers({
    
  productlist:Productlistreducer,    
  productdetail:Productdetailreducer,

  cart:cartreducer, 
  userlogin:userloginreducer 
})

let cartitemfromstorage = localStorage.getItem('cartitem') ? JSON.parse(localStorage.getItem('cartitem')) : []

let userinfofromstorage = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null

let intialstate = {
  cart:{ cartitem:cartitemfromstorage},
  userlogin:{ userinfo:userinfofromstorage}
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
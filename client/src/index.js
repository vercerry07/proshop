import React from 'react';
import ReactDOM from 'react-dom';


import './bootstrap.min.css'
import './index.css';
import App from './App';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'

import {Productlistreducer} from './reducer/productreducer'
let reducer = combineReducers({
  productlist:Productlistreducer


})
let intialstate = {}
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
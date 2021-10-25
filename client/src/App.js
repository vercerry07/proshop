import Footer from './component/footer';
import Navbarr from './component/navbar'


import {Container} from 'react-bootstrap'
import Mainscreen from './component/screen/mainscreen';
import {BrowserRouter, Route} from 'react-router-dom'
import Productscreen from './component/screen/productscreen';
import Cartscreen from './component/screen/cartscreen';
import Loginscreen from './component/screen/loginscreen';

import Registerscreen from './component/screen/registerscreen';

import Profilescreen from './component/screen/profilescreen';
import Shippingscreen from './component/screen/shippingscreen';
import Paymentscreen from './component/screen/paymentscreen'




import Placeorderscreen from './component/screen/placeorderscreen';

import Orderscreen from './component/screen/orderscreen';
import Userlistscreen from './component/screen/userlistscreen';

function App() {    
  return (
<div className="App">
 
 <BrowserRouter>  
   <Navbarr /> 
  <main className='py-2'>     

  <Container>
  
  <Route path='/' component={Mainscreen} exact></Route>   
  <Route path='/signin' component={Loginscreen} ></Route>   
  <Route path='/signup' component={Registerscreen} ></Route>   
  <Route path='/product/:id' component={Productscreen}></Route>  
  <Route path='/cart/:id?' component={Cartscreen}></Route>  
 
  <Route path='/profile' component={Profilescreen}></Route>   
  <Route path='/shipping' component={Shippingscreen} ></Route>   
  <Route path='/payment' component={Paymentscreen} ></Route>   
  <Route path='/placeorder' component={Placeorderscreen} ></Route>   

  
  <Route path='/order/:id' component={Orderscreen} ></Route>   
  <Route path='/userlist' component={Userlistscreen} ></Route>   
  {/* <Mainscreen /> */}

</Container>

  </main>  
  <Footer />  
 
 </BrowserRouter> 
    </div>
  );
}
export default App;
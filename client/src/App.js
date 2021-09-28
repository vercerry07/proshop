import Footer from './component/footer';
import Navbarr from './component/navbar'


import {Container} from 'react-bootstrap'
import Mainscreen from './component/screen/mainscreen';
import {BrowserRouter, Route} from 'react-router-dom'
import Productscreen from './component/screen/productscreen';
function App() {    
  return (
<div className="App">

 <BrowserRouter> 
 
   <Navbarr /> 
  <main className='py-2'>     
  <Container>

  <Route path='/' component={Mainscreen} exact></Route>  
  
  <Route path='/product/:id' component={Productscreen}></Route>  

  {/* <Mainscreen /> */}
</Container>
  </main>  
   <Footer />  
 </BrowserRouter>
    </div>
  
  );
}
export default App;
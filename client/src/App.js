import Footer from './component/footer';
import Navbarr from './component/navbar'


import {Container} from 'react-bootstrap'
function App() {    
  return (
<div className="App">
   <Navbarr /> 
  <main className='py-2'>
     
  <Container>

  <h2>welcome to proshop</h2>
  </Container>
  </main>  
  

   <Footer />  
  
    </div>
  
  );
}

export default App;
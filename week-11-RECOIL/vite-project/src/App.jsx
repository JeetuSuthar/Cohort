
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WishList from '../src/components/WishList'
import AmazonCart from '../src/components/AmazonCart'
import Navbar from './components/Navbar';

import { RecoilRoot } from 'recoil'; // Import RecoilRoot

function App() {
  

  return (
   <div>
    <RecoilRoot>
    <Router>
    <Navbar/>
      <Routes>
        
        <Route path='/' element={<WishList/>} />
        <Route path='/cart' element={<AmazonCart/>} />
       
      </Routes>
    </Router>
    </RecoilRoot>

   </div>
  )
}
export default App

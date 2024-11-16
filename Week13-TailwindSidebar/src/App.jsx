import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Home/>
        
      </div>
    </BrowserRouter>
  );
}

export default App;

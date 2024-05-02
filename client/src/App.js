import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Profilepage from './Pages/Profilepage';
import Addblogpage from './Pages/Addblogpage';
import Editblogpage from './Pages/Editblogpage';
import Settingpage from './Pages/Settingpage';
import Loginpage from './Pages/Loginpage';
import Registerpage from './Pages/Registerpage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/profile' element={<Profilepage />} />
          <Route path='/addblog' element={<Addblogpage />} />
          <Route path='/setting' element={<Settingpage/>} />
          <Route path='/editblog/:id' element={<Editblogpage />} />

          <Route path='/login' element={<Loginpage/>} />
          <Route path='/register' element={<Registerpage/>} />

          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

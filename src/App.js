import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Trucks from './components/trucks/Trucks';
import SignIn from './components/auth/SignIn';
import Reset from './components/auth/Reset';
import { useDispatch, useSelector } from 'react-redux';
import Management from './components/management/Management';
import StatusAlert from './components/layout/StatusAlert';
import Drivers from './components/drivers/Drivers';
import Register from './components/auth/Register';

function App() {
  const user = useSelector((store) => store.users)
  
  return (
    <div className="App flex relative w-[100vw]">
      {/* Fix issue of correctly showing right pages */}
      {
        user.currentUser ? 
        <BrowserRouter>
          <StatusAlert />
          <Navbar/>
          <Routes>
            <Route path='/drivers' element={<Drivers />}/>
            <Route path='/trucks' element={<Trucks />}/>
            <Route index element={<Trucks />}/>
            <Route path='/management' element={<Management />}/>
          </Routes>
        </BrowserRouter>
        :
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/reset' element={<Reset />} />
            <Route index element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;

import './App.css';
import Navbar from './components/layout/Navbar';
import { Route, Routes } from 'react-router-dom';
import Trucks from './components/trucks/Trucks';
import SignIn from './components/auth/SignIn';
import Reset from './components/auth/Reset';
import { useDispatch, useSelector } from 'react-redux';
import Management from './components/management/Management';
import StatusAlert from './components/layout/StatusAlert';

function App() {
  const user = useSelector((store) => store.users)
  
  return (
    <div className="App">
      <div className='flex relative'>
          {/* Fix issue of correctly showing right pages */}
         {user.currentUser ? <>
         <Navbar />
         <StatusAlert />
         <Routes>
              <Route path='/trucks' element={<Trucks />}/>
              <Route path='/management' element={<Management />}/>
          </Routes>
         </> :
         <SignIn />}

          
      </div>
    </div>
  );
}

export default App;

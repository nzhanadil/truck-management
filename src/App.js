import './App.css';
import Navbar from './components/layout/Navbar';
import { Route, Routes } from 'react-router-dom';
import Trucks from './components/trucks/Trucks';
import SignIn from './components/auth/SignIn';
import Reset from './components/auth/Reset';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((store) => store.users)
  
  return (
    <div className="App">
      <div className='w-[100vw] flex'>
          {/* Fix issue of correctly showing right pages */}
         {user.currentUser ? <>
         <Navbar />
         <Routes>
              <Route path='/trucks' element={<Trucks />}/>
          </Routes>
         </> :
         <SignIn />}

          
      </div>
    </div>
  );
}

export default App;

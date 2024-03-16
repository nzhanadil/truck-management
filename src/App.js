import './App.css';
import db from './services/firebase';

import Navbar from './components/layout/Navbar';
import { Route, Routes } from 'react-router-dom';
import Trucks from './components/trucks/Trucks';
import SignIn from './components/auth/SignIn';
import Reset from './components/auth/Reset';

function App() {

  return (
    <div className="App">
      <div className='w-[100vw] flex'>
        {/* <Navbar /> */}
        <Routes>
          <Route index element={<SignIn />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/reset' element={<Reset />}/>
          <Route path='/trucks' element={<Trucks />}/>

        </Routes>
      </div>
    </div>
  );
}

export default App;

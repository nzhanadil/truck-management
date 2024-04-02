import './App.css';
import { Route, Routes } from 'react-router-dom';
import Trucks from './components/trucks/Trucks';
import SignIn from './components/auth/SignIn';
import Reset from './components/auth/Reset';
import Management from './components/management/Management';
import Register from './components/auth/Register';
import Layout from './components/layout/Layout';
import RequireAuth from './components/layout/RequireAuth';
import Dashboard from './components/dashboard/Dashboard';
import PageNotFound from './components/layout/PageNotFound';
import Truck from './components/trucks/Truck';
import Trailers from './components/trailers/Trailers';
import Trailer from './components/trailers/Trailer';
import { Driver, Drivers } from './components/drivers';

function App() {  
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/reset' element={<Reset />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={['driver', 'manager', 'admin']}/>}>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/trucks' element={<Trucks />}/>
          <Route path='/trucks/:id' element={<Truck />}/>
          <Route path='/trailers' element={<Trailers />}/>
          <Route path='/trailers/:id' element={<Trailer />}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={['manager', 'admin']}/>}>
          <Route path='/drivers' element={<Drivers />}/>
          <Route path='/drivers/:email' element={<Driver />}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={['admin']}/>}>
          <Route path='/management' element={<Management />}/>
        </Route>
       
        {/* catch all */}
        <Route path='*' element={<PageNotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;

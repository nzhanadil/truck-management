import './App.css';
import db from './services/firebase';
import Navbar from './components';
import Content from './apps/Content';


function App() {

  return (
    <div className="App flex">
      <Navbar />  
      <Content />
    </div>
  );
}

export default App;

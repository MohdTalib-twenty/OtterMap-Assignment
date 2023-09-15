import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Register from './Screens.js/Register';
import LogIn from './Screens.js/LogIn';
import CreateJob from './Screens.js/CreateShop';
import Home from './Screens.js/Home';
import Navbar from './Components/Navbar';
import Profile from './Screens.js/Profile';
import ProfileEdit from './Edit/ProfileEdit';
import ShopEdit from './Edit/ShopEdit';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register'element={<Register/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path="/registerShop" element={<CreateJob/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path='/userEdit/:Name/:Email' element={<ProfileEdit/>}/>
        <Route path='/jobEdit/:id/:ShopName/:Owner/:Type/:Latitude/:Longitude' element={<ShopEdit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

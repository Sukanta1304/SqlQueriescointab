import {Routes,Route}from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import UserDetails from './components/Userdetails';

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/userdetails" element={<UserDetails/>}/>
      </Routes>
    </div>
  )
}

export default App

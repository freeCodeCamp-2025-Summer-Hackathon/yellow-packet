import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import BrowsePets from './pages/BrowsePets';
import LoginPage from './pages/LoginPage';
import PetProfile from './pages/PetProfile';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router >
      <Routes>
        <Route path="/" element={<LandingPage user={user}/>}/>
        <Route path="/browse" element={<BrowsePets user={user}/>}/>
        <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>}/>
        <Route path="/pet-profile/:petId" element={<PetProfile user={user}/>}/>
      </Routes>
    </Router>
  )
}

export default App

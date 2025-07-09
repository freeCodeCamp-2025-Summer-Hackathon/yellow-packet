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
        <Route path="/" element={<LandingPage  user={user} setUser={setUser} />}/>
        <Route path="/browse" element={<BrowsePets  user={user} setUser={setUser} />}/>
        <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>}/>
        <Route path="/pet-profile/:petId" element={<PetProfile  user={user} setUser={setUser} />}/>
      </Routes>
    </Router>
  )
}

export default App

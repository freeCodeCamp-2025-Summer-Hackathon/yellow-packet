import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import BrowsePets from './pages/BrowsePets';
import LoginPage from './pages/LoginPage';
import PetProfile from './pages/PetProfile';
import SignUpPage from './pages/SignUpPage';
import AboutUs from './pages/AboutUs';
import CreatePet from './pages/CreatePet';
import UserProfile from './pages/UserProfile';


function App() {
	const [user, setUser] = useState(null);
	return (
		<Router >
			<Routes>
				<Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
				<Route path="/browse" element={<BrowsePets user={user} setUser={setUser} />} />
				<Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
				<Route path="/pet-profile/:petId" element={<PetProfile user={user} setUser={setUser} />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/about" element={<AboutUs user={user} setUser={setUser} />} />
				<Route path="/createpet" element={<CreatePet />} />
				<Route path="/user-profile/:userId" element={<UserProfile user={user} setUser={setUser} />} />
			</Routes>
		</Router>
	)
}

export default App

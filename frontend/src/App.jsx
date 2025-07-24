import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import BrowsePets from './pages/BrowsePets';
import LoginPage from './pages/LoginPage';
import PetProfile from './pages/PetProfile';
import SignUpPage from './pages/SignUpPage';
import AboutUs from './pages/AboutUs';
import CreatePet from './pages/CreatePet';
import ShelterProfile from './pages/ShelterProfile';
import EditShelterProfile from './pages/EditShelterProfile';
import UserProfile from './pages/UserProfile';
import EditUserProfile from './pages/EditUserProfile';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 24 * 60 * 60 * 1000, // 24 hours default
			cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days default
			retry: 1,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});

function App() {
	const [user, setUser] = useState(null);

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					<Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
					<Route path="/browse" element={<BrowsePets user={user} setUser={setUser} />} />
					<Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
					<Route path="/pet-profile/:petId" element={<PetProfile user={user} setUser={setUser} />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/about" element={<AboutUs user={user} setUser={setUser} />} />
					<Route path="/createpet" element={<CreatePet />} />
					<Route path="/shelter-profile/:shelterId" element={<ShelterProfile user={user} setUser={setUser} />} />
					<Route path="/edit/shelter-profile/:shelterId" element={<EditShelterProfile user={user} setUser={setUser} />} />
					<Route path="/user-profile/:userId" element={<UserProfile user={user} setUser={setUser} />} />
					<Route path="/edit/user-profile/:userId" element={<EditUserProfile user={user} setUser={setUser} />} />
				</Routes >
			</Router >
		</QueryClientProvider >
	)
}

export default App

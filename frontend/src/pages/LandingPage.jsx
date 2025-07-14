import Header from '../components/Header';
import Navbar from '../components/Navbar';
import BrowsePetsPreview from '../components/BrowsePetsPreview';
import LandingPageHero from '../components/LandingPageHero';
import "../styles/LandingPage.css";

function LandingPage({ user, setUser }) {

	console.log("Welcome ", user); // You can use whoever is logged in to manipulate the pages (if someone is logged in)
	return (
		<div className="landing-page-container">
			<Header user={user} setUser={setUser} />
			<Navbar />
			<main className="main-content">
				<LandingPageHero />
				<BrowsePetsPreview />
			</main>
		</div>
	)
}

export default LandingPage

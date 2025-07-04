import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BrowsePetsPreview from '../components/BrowsePetsPreview';
import LandingPageHero from '../components/LandingPageHero';

function LandingPage(user) {

    console.log("Welcome ", user); // You can use whoever is logged in to manipulate the pages (if someone is logged in)
  return (
    <>
      <div>
        <Header />
        <Navbar />
        <LandingPageHero />
        <BrowsePetsPreview />
        <Footer />
      </div>
    </>
  )
}

export default LandingPage

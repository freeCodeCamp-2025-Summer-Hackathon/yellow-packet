import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PetProfile(user) {

    console.log("Welcome this pet to your home, ", user); // if you need to know who the user is?

  return (
    <>
      <div>
        <Header />
        <Navbar />
        {/* Should include a profile about the pet as well as a way to contact the shelter it belongs to */}
        {/**
         * If you are up for the challenge, you can add components as needed, just be careful not to crowd with files!
         */}
        <Footer />
      </div>
    </>
  );
}

export default PetProfile;
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BrowsePetsHeading from "../components/BrowsePetsHeading";
import PetGrid from "../components/PetGrid";
import PetFilter from "../components/PetFilter";

function BrowsePets(user) {
  console.log("Welcome ", user); // You can use whoever is logged in to manipulate the pages (if someone is logged in) -> Cards / Favorites in this case!

  return (
    <>
      <div>
        <Header />
        <Navbar />
        <BrowsePetsHeading />
        <section id="pet-gallery">
          <PetFilter />
          <PetGrid />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default BrowsePets;

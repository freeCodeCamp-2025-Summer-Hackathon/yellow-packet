import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BrowsePetsHeading from "../components/BrowsePetsHeading";
import PetGrid from "../components/PetGrid";
import PetFilter from "../components/PetFilter";
import { useState } from "react";

function BrowsePets({ user }) {
  const [filters, setfilters] = useState({ type: '', shelter: '', age_stage: '', size: '', sex: '' , favorites: false }); // holds the value of each applied filter, for use with PetGrid.

  // Values for testing: Swap these with values from the database
  const types = ["Dog", "Cat"];
  const shelters = ["Colorado Shelter", "Cali Shelter"];
  const age_stages = ["Youth", "Adult", "Senior"];
  const sizes = ["Small", "Medium", "Large"];
  const sexes = ["Male", "Female"];

  return (
    <>
      <div>
        <Header user={user}/>
        <Navbar />
        <BrowsePetsHeading />
        <section id="pet-gallery">
          <PetFilter filters={filters} setfilters={setfilters} types={types} shelters={shelters} age_stages={age_stages} sizes={sizes} sexes= {sexes}/>
          <div>Testing: {JSON.stringify(filters)}</div> {/* remove for production */}
          <PetGrid />
        </section>
        <Footer />
      </div>
    </>
  );
}

export default BrowsePets;

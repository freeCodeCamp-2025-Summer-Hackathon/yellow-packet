import "../styles/ShelterCard.css";
import ShelterCardAddOn from "../small-assets/ShelterCardAddOn.svg";


export default function ShelterCard({shelterImg, shelter_name, city, state, handleClick}) {

    

    return ( 
    <>
        {/* On click, navigate to the shelter profile page */}
        <div className="shelterCard" onClick={handleClick}>
            <section class="shelter-card-image-container">
                
                <div className="shelter-card-image">
                    <img src={shelterImg} alt="Image of Shelter" className="shelterCardImg"/>
                </div>
            </section>
            <section className="shelter-card-information">
                <div className="shelter-card-name-pseudo-border" />
                <img src={ShelterCardAddOn} alt="shelter" className="titleShelter" />
                <div className="shelterCardName">
                    <h2 className="shelter-card-name">{shelter_name}</h2>
                </div>
                <div className="shelterCardInfo">
                    <p className="shelterCardDesc">{city} - {state}</p>
                </div>
            </section>
        </div>
    </>
    );
};

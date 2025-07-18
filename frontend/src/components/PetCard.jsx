import "../styles/PetCard.css";

export default function PetCard({ name, age, gender, location, type, pic, isFav, onToggleFav }) {

    return ( 
    <>
        <div className="card">
            <div className="image">
                <img src={pic} alt="Image of pet" className="petImg"/>
            </div>
            <div className="petName">
                <span className="fav"></span>
                <h2 className="name">{name}</h2>
                <button onClick={onToggleFav} type="button" className="fav" style={{fontSize: '1.5rem', alignContent: "flex-start", marginTop: '-5px', marginRight: '15px'}}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                >{isFav ? '♥️' : '🩶' }</button>
            </div>
            <div className="petInfo">
                <h3 className="petAge">{age}-year-old {type}</h3>
                <p className="petDesc">{gender} - {location}</p>
            </div>
        </div>
    </>
    );
};

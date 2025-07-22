import "../styles/PetCard.css";

export default function PetCard({ id, name, age, gender, location, type, pics, isFav, onToggleFav, handleClick}) {

    

    return ( 
    <>
        <div className="card" onClick={() => handleClick({ id, name })}>
            <div className="image">
                <img src={pics[0]} alt="Image of pet" className="petImg"/>
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

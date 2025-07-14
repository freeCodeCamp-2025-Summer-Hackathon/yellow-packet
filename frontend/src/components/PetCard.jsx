import React from "react";
import "../styles/PetCard.css";

let isFav = false;

function btnFunction () {
    isFav = !isFav;
    console.log(isFav);

    return isFav;
}

export default function PetCard({name, age, gender, location, type, pic}) {
    return ( 
    <>
        <div className="card">
            <div className="image">
                <img src={pic} alt="Image of pet" className="petImg"/>
            </div>
            <div className="petName">
                <span className="fav"></span>
                <h2 className="name">{name}</h2>
                <button onClick={btnFunction} type="button" className="fav">♥️🩶</button>
            </div>
            <div className="petInfo">
                <h3 className="petAge">{age}-year-old {type}</h3>
                <p className="petDesc">{gender} - {location}</p>
            </div>
        </div>
    </>
    );
};
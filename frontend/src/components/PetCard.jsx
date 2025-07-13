import React from "react";
import "../styles/PetCard.css";

export default function PetCard() {
    return ( 
    <>
        <div className="card">
            <div className="image">
                <img src="https://picsum.photos/200" alt="Image of pet" className="petImg"/>
            </div>
            <div className="petName">
                <span className="fav"></span>
                <h2 className="name">Pet Name</h2>
                <button type="button" className="fav">♡</button>
            </div>
            <div className="petInfo">
                <h3 className="petAge">Pet Age and Type</h3>
                <p className="petDesc">Pet Gender and Location</p>
            </div>
        </div>
    </>
    );
};
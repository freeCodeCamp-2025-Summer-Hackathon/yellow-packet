/* BrowsePetsPreview.jsx */

import React from "react"
import { Link } from "react-router-dom";
import "../styles/BrowsePetsPreview.css"
import pet_1 from "../images/pet_1.jpg";
import pet_2 from "../images/pet_2.jpg";
import pet_3 from "../images/pet_3.jpg";

export default function BrowsePetsPreview(){
    return (
       <section className="browse-preview">
                    <div className="browse-inner">
                        <div className="preview-header">
                            <Link to="/browsepets" className="browse-link">Browse Pets →</Link>
                        </div>
                        <div className="pet-cards">
                            <Link to="/pet_1">
                                <img src={pet_1} alt="Pet 1" className="pet-img" />
                            </Link>
                            <Link to="/pet_2">
                                <img src={pet_2} alt="Pet 2" className="pet-img" />
                            </Link>
                            <Link to="/pet_3">
                                <img src={pet_3} alt="Pet 3" className="pet-img" />
                            </Link>
                        </div>
                    </div>
       </section>  
    );
};
import React from "react"
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar(){
    return ( 
        <div className = "main-navbar">
        {/* 
        You know what a navbar is.. have fun!
        As of rn: Browse and Home
        hopefully: About, MyProfile, Local Shelters 
      */}
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/browse">Browse Pets</Link></li>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </ul>
                </nav>
        </div>
    );
}
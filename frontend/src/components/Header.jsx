import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
 
export default function Header(){
    const [isSignedIn, setIsSignedIn] = useState(false);
    
    return ( 
    <>
        <div className="main-header"> {/* Add Logo If Any */} 
        {/*
            This is going to be rendered on all pages, keep it simple, functional.
            It should include a login button and out PetMatch logo that takes us back to our Landing Page.
        */}
            <Link to="/" className="logo">Pet Match</Link>

            {/* Auth buttons */}
            <div className="auth-buttons">
                {isSignedIn ? (
                    <>
                        <span className="profile-icon">👤</span>
                        <button onClick={() => setIsSignedIn(false)}>Sign Out</button>
                    </>
                ) : (
                    <button onClick={() => setIsSignedIn(true)}>Login</button>
                )}
            </div>
        </div>
    </>
    );
};
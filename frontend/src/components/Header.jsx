import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
 
export default function Header(){
    const [isSignedIn, setIsSignedIn] = useState(false);
    
    return ( 
    <>
        <div className="main-header"> {/* Add Logo If Any */} 
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
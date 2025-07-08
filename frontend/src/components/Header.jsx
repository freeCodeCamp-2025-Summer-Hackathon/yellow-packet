import { Link } from "react-router-dom";
import "../styles/Header.css";
import profileImg from '../images/sample-profile.jpg';

export default function Header({ user, setUser }) {
    return (
    <>
        <div className="main-header"> {/* Add Logo If Any */} 
            <Link to="/" className="logo">Pet Match</Link>

            {/* Auth buttons */}
            <div className="auth-buttons">
                {user ? (
                    <>
                        <Link to="/account" className="profile-icon"><img src={profileImg} alt="Profile" className="profile-img"/></Link>
                        <button onClick={() => {
                            setUser(null);
                            }}>
                                Sign Out
                        </button>
                        
                    </>
                ) : (
                    <Link to="/login" className="login-link">
                        <button>Login</button>
                    </Link>
                )}
            </div>
        </div>
    </>
    );
};
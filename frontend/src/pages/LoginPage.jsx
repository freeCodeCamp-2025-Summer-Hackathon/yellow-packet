/** Allows users to use their credentials to log in to PetMatch */
import "../styles/LoginPage.css"
import LoginHelpModal from "../components/LoginHelpModal"

import luckyBunny from "../images/Bunny.png"
import luckyCat from "../images/Cat.png"
import luckyDog from "../images/Dog.png"
import luckyParrot from "../images/Parrot.png"
import luckySquirrel from "../images/Squirrel.png"

import Apple from "../images/Apple.png"
import Github from "../images/Github.png"
import Google from "../images/google-logo.png"
import Question from "../images/symbol-question-mark.svg"

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function LoginPage({ user, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [luckyAnimal, setLuckyAnimal] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // This just updates the lucky animal, but we can add more as needed
  useEffect(() => {
    const luckyAnimals = [luckyBunny, luckyCat, luckyDog, luckyParrot, luckySquirrel];
    const luckyNum = Math.floor(Math.random() * luckyAnimals.length);
    setLuckyAnimal(luckyAnimals[luckyNum]);

  }, []);

  // When a user presses the log in button
  const handleSubmit = (e) => {
    e.preventDefault();
    // if user(where user.name == name).password == password, then setUser(password)
    setUser({email: email, password: password, id: 1, favorites: []}); // This is just a placeholder, replace with actual login logic
      // handle login logic here (call API)
    console.log("Signing in as: ", { user });
    navigate("/");
  };

  

      return (
      <>
        <Link to="/" className="back-to-home"> &larr; Back to Home </Link>
        <div className="login-container">
          <div className="login-card">
            <h1 className="login-logo">PetMatch</h1>
            <div className="login-box">
              <div className="login-info">

              {/* The animal in the top right corner */}
              {luckyAnimal && (
                <img className="lucky-animal" src={luckyAnimal} alt="Lucky Animal" />
              )} 

              {/* The area before the buttons */}
              <div className="login-header">
                <h2>Welcome back!</h2>
                <p>We’ll send you a magic link to sign in.</p>
                {/* The question button is not connected to anything yet on either page */}
                <img className ="question-mark-circle" src={Question} alt="question" onClick={() =>{setShowModal(!showModal)}}/>
                {showModal && <LoginHelpModal />}
              </div>

              {/* If we decide on external authorization... github doesnt really make sense though, maybe we can swap to facebook or smth */}
              {/* <button className="login-btn github"><img src={Github} alt="Apple Logo" style={{height: '1rem', paddingRight: '1rem'}}/>Continue with GitHub</button>
              <button className="login-btn google"><img src={Google} alt="Apple Logo" style={{height: '1rem', paddingRight: '1rem'}}/>Continue with Google</button>
              <button className="login-btn apple"><img src={Apple} alt="Apple Logo" style={{height: '1rem', paddingRight: '1rem'}}/>  Continue with Apple </button> */}

              {/* <div className="divider">or</div> */}

              {/* The easy way to log in */}
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <input 
                type="email" 
                placeholder="Email address*" 
                className="input" 
                name="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                />

                {/* Password */}
                <div className="password-container" >
                  <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password*" 
                  className="input" 
                  name="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  /><span className="toggle-icon" onClick={() => setShowPassword(!showPassword)} >
                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
                </div>

                {/* To swap to the sign up area */}
                <p className="signup-text">
                  Not a user yet? <Link to="/signup">Create an account</Link>
                </p>

                <button type="submit" className="login-email-btn">Login with Email</button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </>
      );
}

export default LoginPage
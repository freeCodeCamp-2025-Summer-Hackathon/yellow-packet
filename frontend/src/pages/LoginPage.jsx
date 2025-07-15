import "../styles/LoginPage.css"
import luckyBunny from "../images/Bunny.png"
import luckyCat from "../images/Cat.png"
import luckyDog from "../images/Dog.png"
import luckyParrot from "../images/Parrot.png"
import luckySquirrel from "../images/Squirrel.png"
import Apple from "../images/Apple.png"
import Github from "../images/Github.png"
import Google from "../images/google-logo.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

// size: ['Small', 'Medium', 'Large'][i % 3],
function LoginPage({ user, setUser }) {

    const [luckyAnimal, setLuckyAnimal] = useState(null);
        useEffect(() => {
            const luckyAnimals = [luckyBunny, luckyCat, luckyDog, luckyParrot, luckySquirrel];
            const luckyNum = Math.floor(Math.random() * luckyAnimals.length);
            setLuckyAnimal(luckyAnimals[luckyNum]);
    
            if (user){
                setUser(null); // log out if logged in 
            }
        }, [user, setUser]);
    //login page logic

      return (
        <div className="login-container">
          <div className="login-card">
            <h1 className="login-logo">PetMatch</h1>
            <div className="login-box">
              <div className="login-info">
              <img className="lucky-animal" src={luckyAnimal} alt="Lucky Animal" />  
              <div className="login-header">
                <h2>Welcome back!</h2>
                <p>We’ll send you a magic link to sign in.</p>
              </div>

              <button className="login-btn github"><img src={Github} alt="Apple Logo" style={{height: '1rem', paddingRight: '1rem'}}/>Continue with GitHub</button>
              <button className="login-btn google"><img src={Google} alt="Apple Logo" style={{height: '1rem', paddingRight: '1rem'}}/>Continue with Google</button>
              <button className="login-btn apple"><img src={Apple} alt="Apple Logo" style={{height: '1rem', paddingRight: '1rem'}}/>  Continue with Apple </button>

              <div className="divider">or</div>

              <input type="email" placeholder="Email address*" className="input" required/>
              <input type="password" placeholder="Password*" className="input" required/>

              <p className="signup-text">
                Not a user yet? <Link to="/signup">Create an account</Link>
              </p>

              <button className="login-email-btn">Login with Email</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default LoginPage
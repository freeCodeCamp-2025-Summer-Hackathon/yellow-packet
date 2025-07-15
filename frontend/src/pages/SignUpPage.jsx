import "../styles/LoginPage.css"
import luckyBunny from "../images/Bunny.png"
import luckyCat from "../images/Cat.png"
import luckyDog from "../images/Dog.png"
import luckyParrot from "../images/Parrot.png"
import luckySquirrel from "../images/Squirrel.png"
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';



// size: ['Small', 'Medium', 'Large'][i % 3],
function SignUpPage({ user, setUser }) {

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
                <h2>Create your account</h2>
                <p>Use your email to get started with PetMatch.</p>
              </div>

              <input type="email" placeholder="Name*" className="input" name="name"required/>
              <input type="email" placeholder="Email address*" className="input" name="email" required/>
              <input type="password" placeholder="Password*" className="input" name="password" required/>
              {/* <input type="password" placeholder="Confirm Password*" className="input" name="confirm-password" required/> */}
              


              <p className="signup-text">
                Already have an account? <Link to="/login">Login</Link>
              </p>

              <button className="login-email-btn">Sign-Up with Email</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default SignUpPage
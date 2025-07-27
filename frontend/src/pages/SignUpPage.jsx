/** Allows user to make a new account with PetMatch.. why can we log in with external auth but not sign up with external auth? 
 * 
 * Also: Does not automatically log users in
*/
import "../styles/LoginPage.css"
import SignUpHelpModal from "../components/SignUpHelpModal"

import luckyBunny from "../images/Bunny.png"
import luckyCat from "../images/Cat.png"
import luckyDog from "../images/Dog.png"
import luckyParrot from "../images/Parrot.png"
import luckySquirrel from "../images/Squirrel.png"

import Question from "../images/symbol-question-mark.svg"

import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [luckyAnimal, setLuckyAnimal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const [errorMessage, setErrorMessage] = useState(''); // Error state for validation messages

  useEffect(() => {
    const luckyAnimals = [luckyBunny, luckyCat, luckyDog, luckyParrot, luckySquirrel];
    const luckyNum = Math.floor(Math.random() * luckyAnimals.length);
    setLuckyAnimal(luckyAnimals[luckyNum]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // handle registration logic here (call API)
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== document.querySelector('input[name="confirm-password"]').value) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed!");
      }

      // Redirect or show a success message
      alert("Signup successful!");
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong, please try again.");
      setLoading(false);
    }
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
                <h2>Create your account</h2>
                <p>Use your email to get started with PetMatch.</p>
                {/* The question button is not connected to anything yet on either page */}
                <img className="question-mark-circle" src={Question} alt="question" onClick={() => { setShowModal(!showModal) }} />
                {showModal && <SignUpHelpModal />}
              </div>

              {/* The form that accepts user info so we can make a new account. */}
              <form onSubmit={handleSubmit}>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <input
                  type="text"
                  placeholder="Name*"
                  className="input"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required />

                <input type="email"
                  placeholder="Email address*"
                  className="input"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />

                <div className="password-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password*"
                    className="input"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                  <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </span>
                </div>

                {/* Confirm Password (I added this, it's important for sign ups I think) */}
                <div className="password-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password*"
                    className="input"
                    name="confirm-password"
                    required />
                  <span className="toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </span>
                </div>

                <p className="signup-text">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
                <button
                  type="submit"
                  className="login-email-btn"
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign-Up with Email'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;

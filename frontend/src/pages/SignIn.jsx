import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
};

const formContainerStyle = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
};

const inputStyle = {
    width: 'calc(100% - 20px)',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ddd'
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px'
};

const headingStyle = {
    marginBottom: '20px',
    color: '#333'
};

const googleLoginContainerStyle = {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #eee'
};

const secondaryButtonStyle = {
    display: 'inline-block',
    padding: '8px 15px',
    backgroundColor: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'none',
    marginTop: '10px',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
};

const secondaryButtonHoverStyle = {
    backgroundColor: '#007bff',
    color: 'white'
};

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        console.log('SignIn Form Submitted:', { email, password });
        alert('Signed in successfully! (Frontend only simulation)');
    };

    const handleGoogleSuccess = (response) => {
        console.log('Google Sign-in Success:', response);
        alert('Signed in with Google! (Frontend only simulation)');
    };

    const handleGoogleError = () => {
        console.log('Google Sign-in Failed');
        alert('Google Sign-in Failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div style={containerStyle}>
                <div style={formContainerStyle}>
                    <h2 style={headingStyle}>Sign In</h2>
                    <form onSubmit={handleSignInSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={inputStyle}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                        />
                        <button type="submit" style={buttonStyle}>Sign In</button>
                    </form>
                    <div style={googleLoginContainerStyle}>
                        <p>OR</p>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            text="signin_with"
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <p>Don't have an account?</p>
                        <Link
                            to="/signup"
                            style={secondaryButtonStyle}
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, secondaryButtonHoverStyle)}
                            onMouseLeave={(e) => Object.assign(e.currentTarget.style, secondaryButtonStyle)}
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default SignIn;
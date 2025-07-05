import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";

const SignIn = () => {
  const [method, setMethod] = useState("email");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationValue, setVerificationValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PetMatch Signin Page";
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    // Implement sign in logic here (frontend only)
    alert("Sign in attempted (frontend only)");
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setVerificationSent(true);
    // Simulate sending verification code
  };

  return (
    <div className="signup-container">
      <h2>Sign In</h2>
      <div style={{ marginBottom: 24 }}>
        <GoogleButton
          onSuccess={() => alert("Google sign-in successful (frontend only)")}
          onError={() => alert("Google sign-in failed")}
        />
      </div>
      {!showForgot ? (
        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: 16 }}>
            <label>
              <input
                type="radio"
                checked={method === "email"}
                onChange={() => setMethod("email")}
              />
              Email
            </label>
            <label style={{ marginLeft: 16 }}>
              <input
                type="radio"
                checked={method === "phone"}
                onChange={() => setMethod("phone")}
              />
              Phone
            </label>
          </div>
          <input
            type={method === "email" ? "email" : "tel"}
            placeholder={method === "email" ? "Email" : "Phone"}
            value={value}
            onChange={e => setValue(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
          <button type="submit" style={{ width: "100%", padding: 10 }}>Sign In</button>
          <div style={{ marginTop: 12, textAlign: "right" }}>
            <button
              type="button"
              style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", padding: 0 }}
              onClick={() => setShowForgot(true)}
            >
              Forgot password?
            </button>
          </div>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <span>Don't have an account? </span>
            <button
              type="button"
              style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", padding: 0 }}
              onClick={() => navigate("/signup")}
            >
              Create an account
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleForgot}>
          <h4>Forgot Password</h4>
          <div style={{ marginBottom: 16 }}>
            <label>
              <input
                type="radio"
                checked={method === "email"}
                onChange={() => setMethod("email")}
              />
              Email
            </label>
            <label style={{ marginLeft: 16 }}>
              <input
                type="radio"
                checked={method === "phone"}
                onChange={() => setMethod("phone")}
              />
              Phone
            </label>
          </div>
          <input
            type={method === "email" ? "email" : "tel"}
            placeholder={method === "email" ? "Email" : "Phone"}
            value={verificationValue}
            onChange={e => setVerificationValue(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
          <button type="submit" style={{ width: "100%", padding: 10 }}>
            Send Verification Code
          </button>
          {verificationSent && (
            <div style={{ marginTop: 12, color: "green" }}>
              Verification code sent to your {method}.
            </div>
          )}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button
              type="button"
              style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", padding: 0 }}
              onClick={() => setShowForgot(false)}
            >
              Back to Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignIn;

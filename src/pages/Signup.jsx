import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";

const Signup = () => {
  const [method, setMethod] = useState("email");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PetMatch Signup Page";
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Account created (frontend only)");
    navigate("/signin");
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <div style={{ marginBottom: 24 }}>
        <GoogleButton
          onSuccess={() => {
            alert("Google signup successful (frontend only)");
            navigate("/signin");
          }}
          onError={() => alert("Google signup failed")}
        />
      </div>
      <form onSubmit={handleSignup}>
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
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Create Account
        </button>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <span>Already have an account? </span>
          <button
            type="button"
            style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", padding: 0 }}
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
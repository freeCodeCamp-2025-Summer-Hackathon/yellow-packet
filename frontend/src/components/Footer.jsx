import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

export default function Footer(){
    return ( 
    <>
        <div className = "main-footer">
        {/*
            We may not even keep the footer, but if we do ig it just hold copyright info
        */}
            <div className="footer-left">
                <Link to="/about">About</Link>
                <Link to="/contact">Contact Us</Link>
            </div>
            <div className="footer-right">
                <span>© 2025 Pet Match</span>
            </div>
        </div>
    </>
    );
};
import React, { useEffect, useRef } from "react";

const GoogleButton = ({ onSuccess, onError }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = () => {
        if (window.google && buttonRef.current) {
          window.google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID",
            callback: onSuccess,
          });
          window.google.accounts.id.renderButton(buttonRef.current, {
            theme: "outline",
            size: "large",
          });
        }
      };
      document.body.appendChild(script);
    } else if (window.google && buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: onSuccess,
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, [onSuccess]);

  return <div ref={buttonRef}></div>;
};

export default GoogleButton;
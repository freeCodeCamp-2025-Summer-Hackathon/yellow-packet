import React from 'react';

function ForgotPassword() {
  return (
    <div>
      <h2>Forgot Password</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
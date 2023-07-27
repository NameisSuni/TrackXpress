import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');

  const handleLogin = () => {
    // Assuming successful verification for the default test OTP value of 123456
    if (otp === '123456') {
      onLogin();
    } else {
      alert('Invalid OTP');
    }
  };


  return (
    <div className="login-container">
      <h1>TrackXpress</h1>
      <div className="image-container">
        <img src="https://i.pinimg.com/564x/0f/f8/ce/0ff8ce20452f671134de5af16dc7cbb1.jpg" alt="Banner" />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
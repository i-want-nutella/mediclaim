import axios from 'axios';
import React, { useState } from 'react';
import './Forgt_ps.css'; // Ensure this is the correct path to your CSS file

const EmailStep = ({ email, setEmail, handleSendEmail }) => (
  <div className="step-container">
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <button onClick={handleSendEmail}>Send Email</button>
  </div>
);

const TokenStep = ({ token, setToken, handleVerifyToken }) => (
  <div className="step-container">
    <input
      type="text"
      placeholder="Enter the token"
      value={token}
      onChange={(e) => setToken(e.target.value)}
      required
    />
    <button onClick={handleVerifyToken}>Verify Token</button>
  </div>
);

const PasswordResetStep = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleResetPassword,
}) => (
  <div className="step-container">
    <input
      type="password"
      placeholder="New password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Confirm new password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />
    <button onClick={handleResetPassword}>Reset Password</button>
  </div>
);

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSendEmail = async () => {
    if (!email) {
      alert('Email is required.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post(`http://localhost:8081/password/forgot?email=${email}`);
      setStep(2);
      alert('An email with a token has been sent to your email address.');
    } catch (error) {
      alert('Failed to send email. Please try again.');
    }
  };

  const handleVerifyToken = () => {
    if (!token) {
      alert('Token is required.');
      return;
    }

    // Simulate token verification success
    setStep(3);
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert('Both password fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      await axios.post(`http://localhost:8081/password/reset?token=${token}&password=${newPassword}`);
      alert('Password has been reset successfully.');
      setStep(1);
      setEmail('');
      setToken('');
      setNewPassword('');
      setConfirmPassword('');
      window.location.href = '/';
    } catch (error) {
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="containering">
      <div className="content-section">
        <h1>Forgot Password?</h1>
        <p>No need to panic! Simply follow the steps below to reset your password and continue enjoying our services.<br />Your security is our priority.</p>
        <div className="details">
          <div className="container">
            {step === 1 && (
              <EmailStep
                email={email}
                setEmail={setEmail}
                handleSendEmail={handleSendEmail}
              />
            )}
            {step === 2 && (
              <TokenStep
                token={token}
                setToken={setToken}
                handleVerifyToken={handleVerifyToken}
              />
            )}
            {step === 3 && (
              <PasswordResetStep
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                handleResetPassword={handleResetPassword}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

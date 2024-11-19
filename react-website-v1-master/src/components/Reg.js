import axios from 'axios'; // Import Axios
import React, { useState } from 'react';
import './Reg.css';

function Reg() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !mobileNum || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (!/^\d{10}$/.test(mobileNum)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Prepare the data to be sent
    const registrationData = {
      email,
      firstName,
      lastName,
      mobileNum,
      password,
    }; 

    console.log(registrationData);

    try {
      // Make the API call
      const response = await axios.post('http://localhost:8081/reg', registrationData);
      if (response.status === 200) {
        alert('Registration successful! Please check your email for verification.');
        window.location.href = '/login';
      }
    } catch (error) {
      alert('Registration failed. Please try again later.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className='bg1'>
      <div className='dual'>
        <div className='wrapper_reg1'>
        </div>
        <form onSubmit={handleRegister}>
            <h1>Register Now!</h1>
            <h2>Your Journey to Health Starts Here..</h2>
            <div className="input-box-reg">
              
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-row-reg">
              <div className="input-box-reg">
                
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-box-reg">
                
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-box-reg">
              
              <input
                type="text"
                placeholder="Mobile Number"
                value={mobileNum}
                onChange={(e) => setMobileNum(e.target.value)}
                required
              />
            </div>
            <div className="input-box-reg">
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-box-reg">
              
              <input
                type="password"
                placeholder="Retype Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="animated-button">Register</button>
            <div className="login-link">
              <p>Already have an account? <a href="/login">Login</a></p>
            </div>
          </form>
      </div>
    </div>
  );
}

export default Reg;

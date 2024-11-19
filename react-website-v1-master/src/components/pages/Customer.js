import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Customer.css';

function Customer() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password || !role) {
      alert('Please fill in all fields');
      return;
    }


    if (role === 'Admin') {
      if (username === 'admin123' && password === 'cms') {
        setIsLoggedIn(true);
        setTimeout(() => history.push('/admin'), ); // delay to navigate after transition
      } else {
        alert('Invalid admin credentials');
      }
    } else {
      try {
        const response = await axios.get(`http://localhost:8081/login?email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);

        if (response.status === 200) {
          localStorage.setItem('userEmail', username);
          if (role === 'Customer') {
            setTimeout(() => history.push('/customerdash'), 0); // delay to navigate after transition
          } else if (role === 'Hospital TPA') {
            setTimeout(() => history.push('/tpa'), 0); // delay to navigate after transition
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert(error.response.data);
        }
        else {
          alert('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <div className ="bg">
            <form onSubmit={handleLogin} className = {isLoggedIn ? 'bef' : ''}>
              <h1>Login</h1>
              <div className="input-box-1">
                <input
                  type="text"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
              <ul onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <i class="fa-solid fa-eye"></i>: <i class="fa-solid fa-eye-slash"></i>}
                </ul>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>
              <div className="input-box-1">
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="custom-select"
                >
                  <option value='' disabled>Select Role</option>
                  <option value="Customer">Customer</option>
                  <option value="Hospital TPA">Hospital TPA</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="remember-forgot">
                <a href="/forgot">Forgot password?</a>
              </div>
              <button type='submit'>Login</button>
              <div className="register-link">
                <p>Don't have an account?<a href="/sign-up">Register</a></p>
              </div>
            </form>
        <div className='design-component'>
        </div>
      </div>
  );
}

export default Customer;

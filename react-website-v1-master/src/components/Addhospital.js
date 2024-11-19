import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Addhospital.css';

function Addhospital() {
  const [hospitalName, setHospitalName] = useState('');
  const [address, setAddress] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    const hospitalData = {
      hospitalName,
      address,
      adminEmail
    };
    console.log(hospitalData);

    try {
      const response = await axios.post('http://localhost:8080/admin/hospitals/add', hospitalData, {
        headers: {
          'Authorization': 'Basic YWRtaW4xMjM6Y21z',
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        // Proceed to register the hospital admin
        const registrationData = {
          email: adminEmail,
          firstName: hospitalName,
          lastName: hospitalName,
          mobileNum: '0000000000',
          password: 'MediClaim'
        };

        try {
          const regResponse = await axios.post('http://localhost:8081/reg', registrationData);

          if (regResponse.status === 200) {
            alert('Hospital added successfully!');
            window.location.href = '/admin';
          } else {
            alert('Failed to register the hospital admin. Please try again.');
          }
        } catch (error) {
          alert('Failed to register the hospital admin. Please try again.');
          console.error('Registration error:', error);
        }

        // Clear the form
        setHospitalName('');
        setAddress('');
        setAdminEmail('');
      }
    } catch (error) {
      console.error('There was an error adding the hospital!', error);
      alert('Failed to add the hospital. Please try again.');
    }
  };

  return (
    <div className='sbg'>
      <div className='text-wrap'>
        <form className="hospital-form" onSubmit={handleRegisterFormSubmit}>
          <h1>Link new hospitals to the network!</h1>
          <div className="form-wrap">
            <input
              type="text"
              placeholder="Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
            />
          </div>
          <div className="form-wrap">
            <input
              type="text"
              placeholder="Hospital Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-wrap">
            <input
              type="email"
              placeholder="Hospital Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Add Hospital</button>
        </form>
      </div>
      <div className="hos-bg-1"></div>
      <div className="hos-bg-2"></div>
      <div className="hos-bg">
        <Link to='/' onClick={closeMobileMenu}>
          <img src="./images/title.png" className="App-title1" />
        </Link>
      </div>
    </div>
  );
}

export default Addhospital;

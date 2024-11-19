import axios from 'axios';
import React, { useState } from 'react';
import './Admit_hos.css';

const Admit_hos = () => {
  const [email, setEmail] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState('');

  const handleEmailChange = async (e) => {
    const userEmail = e.target.value;
    setEmail(userEmail);

    if (userEmail) {
      try {
        const response = await axios.get(`http://localhost:8080/admin/check/${userEmail}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW4xMjM6Y21z',
          },
        });
        setPolicies(response.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
        setPolicies([]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && selectedPolicy) {
      try {
        const response = await axios.get(`http://localhost:8080/admin/checkUser`, {
          params: {
            email,
            policyName: selectedPolicy,
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW4xMjM6Y21z',
          },
        });

        if (response.data){
          try {
            const response = await axios.get(`http://localhost:8080/admin/userValid`, {
              params: {
                email,
                policyName: selectedPolicy,
              },
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW4xMjM6Y21z',
              },
            });
          if (!response.data) {
            const claimData = {
              accEmail: email,
              userEmail: localStorage.getItem('userEmail'), // Assuming the userEmail is stored in localStorage
              policyName: selectedPolicy,
              amountClaimed: 0,
              status: "Not Submitted",
              adminRemarks: "Not Submitted"
            };try {
              const claimResponse = await axios.post('http://localhost:8090/claim/submit', claimData, {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              });
              if (claimResponse.status === 200) {
                alert('Patient is Admitted');
                window.location.href = '/tpa';
              } else {
                alert('Failed, Try after Sometime');
              }
            } catch (claimError) {
              console.error("Error submitting claim data:", claimError);
              alert('An error occurred while submitting the claim data.');
            }
          } 
          else {
            alert('User already Admitted');
          }
        } catch (error) {
          console.error("Error checking user:", error);
          alert('An error occurred while checking the user.');
        }
        }

    }catch (claimError) {
      console.error("Error submitting claim data:", claimError);
      alert('An error occurred while submitting the claim data.');
    }
  }};

  return (
    <div className="claim-form-container-2">
      <form className="claim-form-2" onSubmit={handleSubmit}>
        <h1>Verify Patient Details</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        {policies.length >= 0 && (
          <select
            value={selectedPolicy}
            onChange={(e) => setSelectedPolicy(e.target.value)}
            required
          >
            <option value="">Select Policy</option>
            {policies.map((policy) => (
              <option key={policy.id} value={policy.policyName}>
                {policy.policyName}
              </option>
            ))}
          </select>
        )}

        <button type="submit">Admit Patient</button>
      </form>
      <div className='side-2'></div>
      <div className='side-3'></div>
    </div>
  );
};

export default Admit_hos;

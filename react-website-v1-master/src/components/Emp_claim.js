import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Emp_claim.css';

const Emp_claim = () => {
  const [userEmail, setuserEmail] = useState('');
  const [accEmail, setaccEmail] = useState('');
  const [policyName, setpolicyName] = useState('');
  const [amountClaimed, setamountClaimed] = useState('');
  const [policyOptions, setPolicyOptions] = useState([]);

  useEffect(() => {
    const storeduserEmail = localStorage.getItem('userEmail');
    if (storeduserEmail) {
      setuserEmail(storeduserEmail);
      setaccEmail(storeduserEmail);
    }
  
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/check/${userEmail}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic YWRtaW4xMjM6Y21z',
          },
          withCredentials: true,
        });
        const policies = response.data.map((policy) => policy.policyName);
        setPolicyOptions(policies);
      } catch (error) {
        console.error('There was an error fetching the policies!', error);
      }
    };
  
    fetchPolicies();
  }, [userEmail]); // Add dependency for userEmail
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const claimData = {
      userEmail,
      accEmail,
      policyName,
      amountClaimed,
    };
    console.log(claimData);

    try {
      const response = await axios.post('http://localhost:8090/claim/submit', claimData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      alert('Claim submitted successfully!');
      window.location.href = '/user';
    } catch (error) {
      console.error('There was an error submitting the claim!', error);
      alert('Failed to submit claim. Please try again.');
    }
  };

  return (
    <div className="claim-form-container">
      <form className="claim-form" onSubmit={handleSubmit}>
        <h2>Submit Claim!</h2>
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setuserEmail(e.target.value)}
          disabled
          required
        />
        <select
          value={policyName}
          onChange={(e) => setpolicyName(e.target.value)}
          required
        >
          <option value="" disabled>Select Policy</option>
          {policyOptions.map((policy, index) => (
            <option key={index} value={policy}>
              {policy}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount Claimed"
          value={amountClaimed}
          onChange={(e) => setamountClaimed(e.target.value)}
          required
        />
        <button type="submit">Submit Claim</button>
      </form>
      <div className='claim-bg'></div>
      <div className='claim-bg-1'></div>
      <div className='claim-bg-2'></div>
    </div>
  );
};

export default Emp_claim;

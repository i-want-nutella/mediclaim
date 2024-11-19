import axios from 'axios';
import React, { useState } from 'react';
import './Addpolicy.css';

function Addpolicy() {
  const [policyName, setpolicyName] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const policyData = {
      policyName,
      coverageAmount,
      description,
    };

    try {
      const response = await axios.post('http://localhost:8080/admin/policies/add', policyData, {
        headers: {
          'Authorization': 'Basic YWRtaW4xMjM6Y21z',
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('Policy added successfully');
        // Reset form fields
        setpolicyName('');
        setCoverageAmount('');
        setDescription('');
        window.location.href = '/admin';
      } else {
        alert('An error occurred while adding the policy');
      }
    } catch (error) {
      console.error('An error occurred:', error.response || error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      alert('An error occurred: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="adcontainer">
      <div className="form-container-policy">
        <h1>Add New Policies</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              id="policyName"
              value={policyName}
              onChange={(e) => setpolicyName(e.target.value)}
              placeholder="Enter Policy Name"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              id="coverageAmount"
              value={coverageAmount}
              onChange={(e) => setCoverageAmount(e.target.value)}
              placeholder="Enter Coverage Amount"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="About the Policy..."
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    <div className="policy-bg-1"></div>
    <div className="policy-bg-2"></div>
    <div className="policy-bg"></div>
    </div>
  );
}

export default Addpolicy;

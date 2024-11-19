import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './HosClaim.css';

const Claims = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null); // State to store selected claim
  const [userEmail, setUserEmail] = useState('');
  const [policyName, setPolicyName] = useState('');
  const [amountClaimed, setAmountClaimed] = useState('');
  const [accEmail, setAccEmail] = useState(''); // State to store the accEmail from the selected claim

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);

    axios.get(`http://localhost:8090/claim/tp/${email}`)
      .then(response => {
        const notSubmittedClaims = response.data.filter(claim => claim.status === 'Not Submitted');
        if (!notSubmittedClaims || notSubmittedClaims.length === 0) {
          alert('All pending claims have been submitted');
          window.location.href = '/tpa'; // Redirect to /tpa
        } else {
          setClaims(notSubmittedClaims);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the claims!", error);
      });
  }, []);

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim); // Set the selected claim
    setPolicyName(claim.policyName); // Set the policy name for the selected claim
    setAccEmail(claim.accEmail); // Set the accEmail for the selected claim
  };

  const handleBack = () => {
    setSelectedClaim(null); // Reset the selected claim to null to show the claims list again
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const claimData = {
      userEmail : accEmail,
      policyName,
      amountClaimed,
    };
    
    const params = new URLSearchParams(claimData).toString();
    
    try {
      const response = await fetch(`http://localhost:8090/claim/update?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Claim submitted successfully!');
        window.location.href = '/tpa';
      } else {
        alert('Failed to submit the claim. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  // If a claim is selected, display the claim submission form
  if (selectedClaim) {
    return (
      <div className="claim-form-container-1">
        <button className="back-button" onClick={handleBack}>Back to Claims</button> {/* Back button */}
        <form className="claim-form-1" onSubmit={handleSubmit}>
          <h2>Cash Your Bills!</h2>
          <label>User Email:</label>
          <input
            type="email"
            placeholder="User Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            disabled
            required
          />
          <label>Patient's Email:</label>
          <input
            type="email"
            placeholder="Patient Email"
            value={accEmail}
            onChange={(e) => setAccEmail(e.target.value)}
            disabled
            required
          />
          <label>Policy Name:</label>
          <input
            type="text"
            placeholder="Policy Number"
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            disabled
            required
          />
          <label>Amount to be claimed:</label>
          <input
            type="number"
            placeholder="Amount Claimed"
            value={amountClaimed}
            onChange={(e) => setAmountClaimed(e.target.value)}
            required
          />
          <button type="submit">Submit Claim</button>
        </form>
        <div className='claim-bg-0'></div>
        <div className='claim-bg-01'></div>
        <div className='claim-bg-02'></div>
      </div>
    );
  }

  // Display the list of claims if no claim is selected
  return (
<div>
<div className="claims-container">
      {claims.map(claim => (
        <div className="claim-card" key={claim.id} onClick={() => handleClaimClick(claim)}>
          <h3 className="claim-id">Claim ID: {claim.id}</h3>
          <p className="claim-email">Patient Email: {claim.accEmail}</p>
          <p className="claim-policy">Policy Name: {claim.policyName}</p>
        </div>
      ))}
    </div>
    <div className='claim-bg-01'></div>
    <div className='claim-bg-02'></div>
</div>
  );
};

export default Claims;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ClaimsComponent = () => {
  const [claims, setClaims] = useState([]);

  const fetchAndFilterClaims = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/claims', {
        headers: {
          'Authorization': 'Basic YWRtaW4xMjM6Y21z'
        }
      });

      // Assuming the response data is an array of claims
      const filteredClaims = response.data.filter(claim => claim.status !== 'Not Submitted');
      
      // Update the state with the filtered claims
      setClaims(filteredClaims);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  useEffect(() => {
    fetchAndFilterClaims();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <h1>Claims</h1>
      <ul>
        {claims.map((claim, index) => (
          <li key={index}>
            {claim.id}
            {claim.policyName} - {claim.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimsComponent;

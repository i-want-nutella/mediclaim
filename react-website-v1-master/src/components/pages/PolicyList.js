import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './PolicyList.css';

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [expandedPolicyId, setExpandedPolicyId] = useState(null);
  const userEmail = localStorage.getItem('userEmail');
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8080/admin/policies', {
      headers: {
        'Authorization': 'Basic YWRtaW4xMjM6Y21z'
      }
    })
    .then(response => {
      setPolicies(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the policies!', error);
    });
  }, []);

  const handleEnroll = (policyName) => {
    axios.post('http://localhost:8090/enrollement/reg', { "userEmail": userEmail, "policyName": policyName })
    .then(response => {
      console.log('Enrollment successful:', response.data);
      alert('Enrollment successful!');
      history.push('/customerdash');
    })
    .catch(error => {
      console.error('There was an error enrolling in the policy!', error);
    });
  };

  const toggleDescription = (policyId) => {
    setExpandedPolicyId(expandedPolicyId === policyId ? null : policyId);
  };

  return (
    <div className="policy-list-wrapper">
      <div className="policy-view-container">
        <div className="policy-list">
          {policies.map(policy => (
            <div 
              key={policy.id} 
              className="policy-card" 
              onClick={() => toggleDescription(policy.id)}
            >
              <p><strong>Policy Name: </strong> {policy.policyName}&nbsp;&nbsp;&nbsp;&nbsp;<strong>Coverage Amount:</strong> ${policy.coverageAmount.toFixed(2)}</p>
              <p></p>
               <p>{/*<strong>Description:</strong> */}
              {expandedPolicyId === policy.id ? (
                <div className="policy-description">
                  <p>{policy.description}</p>
                  <button onClick={() => handleEnroll(policy.policyName)}>Enroll</button>
                </div>
              ) : (
                <p>
                  {policy.description.length > 100 ? 
                    `${policy.description.substring(0, 100)}...` : policy.description}
                </p>
              )}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyList;

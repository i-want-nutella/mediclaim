import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ClaimList.css';

const ClaimList = () => {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [filter, setFilter] = useState('All'); // State to handle filter
  const [sortDirection, setSortDirection] = useState('asc'); // State to handle sorting direction
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8080/admin/claims', {
      headers: {
        'Authorization': 'Basic YWRtaW4xMjM6Y21z'
      }
    })
    .then(response => {
      const filteredData = response.data.filter(claim => claim.status !== 'Not Submitted');
      const sortedClaims = filteredData.sort((a, b) => a.id - b.id);
      setClaims(sortedClaims);
      setFilteredClaims(sortedClaims); // Initialize filtered claims with sorted claims
    })
    .catch(error => {
      console.error('There was an error fetching the claims!', error);
    });
  }, []);

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim);
    setRemarks(claim.remarks || '');
  };

  const handleApproval = (claimId, isApproved, remarks) => {
    axios.post(`http://localhost:8080/admin/claims/${claimId}/approve?remarks=${remarks}&isApproved=${isApproved}`, {}, {
      headers: {
        'Authorization': 'Basic YWRtaW4xMjM6Y21z'
      }
    })
    .then(response => {
      if(isApproved){
        alert(`Successfully, The claim has been Approved !!`);
      }else {
        alert(`This displayed claim has been Rejected !!`);
      }
      
      // After successful approval/rejection, refresh claims
      setSelectedClaim(null);
      axios.get('http://localhost:8080/admin/claims', {
        headers: {
          'Authorization': 'Basic YWRtaW4xMjM6Y21z'
        }
      })
      .then(response => {
        const filteredData = response.data.filter(claim => claim.status !== 'Not Submitted');
        const sortedClaims = filteredData.sort((a, b) => a.id - b.id);
        setClaims(sortedClaims);
        setFilteredClaims(sortedClaims);
      });
    })
    .catch(error => {
      console.error('There was an error updating the claim status!', error);
    });
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    if (selectedFilter === 'All') {
      setFilteredClaims(claims);
    } else {
      const filtered = claims.filter(claim => {
        const status = claim.status === 'Pending' ? 'Pending' : claim.status;
        return status === selectedFilter;
      });
      setFilteredClaims(filtered);
    }
  };

  const handleSortChange = () => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedClaims = [...filteredClaims].sort((a, b) => {
      if (direction === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setSortDirection(direction);
    setFilteredClaims(sortedClaims);
  };

  const formatDate = (dateString) => {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusLabel = (status) => {
    switch(status) { 
      case 'Pending':
        return 'Pending';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
    }
  };

  return (
    <div>
      {!selectedClaim ? (
        <div className='hmm'>
          <table>
            <thead>
              <tr>
                <th onClick={handleSortChange} style={{ cursor: 'pointer' }}>
                  Claim ID {sortDirection === 'asc' ? '↑' : '↓'}
                </th>
                <th>Email</th>
                <th>Amount Claimed</th>
                <th>Policy Name</th>
                <th>{<select value={filter} onChange={handleFilterChange}>
                  <option value="All">Status</option>
                  <option value="Pending">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>}</th>
                <th>Claim Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map(claim => (
                <tr key={claim.id} onClick={() => handleClaimClick(claim)} style={{ cursor: 'pointer' }}>
                  <td>{claim.id}</td>
                  <td>{claim.userEmail}</td>
                  <td>{claim.amountClaimed}</td>
                  <td>{claim.policyName}</td>
                  <td>{getStatusLabel(claim.status)}</td>
                  <td>{formatDate(claim.claimDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className="claim-details">
            <div onClick={() => setSelectedClaim(null)} style={{ cursor: 'pointer' }}>
              <h2>Back to List</h2>
            </div>
            <p><strong>Email: </strong>{selectedClaim.userEmail}</p>
            <p><strong>Amount Claimed:</strong> ₹ {selectedClaim.amountClaimed}</p>
            <p><strong>Policy Name:</strong> {selectedClaim.policyName}</p>
            <p><strong>Status:</strong> {getStatusLabel(selectedClaim.status)}</p>
            <p><strong>Remarks:</strong><br/>
            {selectedClaim.status === 'Pending' && ( <input
                                                      type="text"
                                                      placeholder={selectedClaim.adminRemarks}
                                                      value={remarks}
                                                      onChange={(e) => setRemarks(e.target.value)}
                                                      required
                                                      />)}
            {selectedClaim.status !== 'Pending' && (selectedClaim.adminRemarks)}
            </p>
            {selectedClaim.status === 'Pending' && (
              <div className='simp'>
                <button onClick={() => handleApproval(selectedClaim.id, true, remarks)}>Approve</button>
                <button onClick={() => handleApproval(selectedClaim.id, false, remarks)}>Reject</button>
              </div>
            )}
          </div>
          <div className='claim-details-2'></div>
        </div>
      )}
    </div>
  );
};

export default ClaimList;

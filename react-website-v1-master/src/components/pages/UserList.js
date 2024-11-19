import React, { useEffect, useState } from 'react';
import './UserList.css'; // Import CSS for styling

const UserList = () => {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [expandedClaimId, setExpandedClaimId] = useState(null);
  const [filter, setFilter] = useState('All'); // State to handle filter

  useEffect(() => {
    const fetchClaims = async () => {
      const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
      if (email) {
        const response = await fetch(`http://localhost:8090/claim/user/${email}`);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          // Filter out claims that are 'Not Submitted' or have null status
          const validClaims = data.filter(claim => claim.status && claim.status !== 'Not Submitted');
          // Sort the claims by claim ID in ascending order
          const sortedData = validClaims.sort((a, b) => a.id - b.id);
          setClaims(sortedData); // Store the sorted array of valid claims
          setFilteredClaims(sortedData); // Initialize filtered claims with all valid claims
        } else if (response.status === 404) {
          alert("Sorry, no records found");
          window.location.href = '/customerdash';
        } else {
          console.error('Failed to fetch claims:', response.statusText);
        }
      } else {
        console.error('User email not found in local storage');
      }
    };
    fetchClaims();
  }, []);

  const handleExpand = (id) => {
    setExpandedClaimId(expandedClaimId === id ? null : id); // Toggle expansion
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    if (selectedFilter === 'All') {
      setFilteredClaims(claims);
    } else {
      const filtered = claims.filter(claim => claim.status === selectedFilter);
      setFilteredClaims(filtered);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Pending':
        return 'Pending';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', { // Format in Indian locale
      weekday: 'long', // 'Mon'
      year: 'numeric', // '2024'
      month: 'short', // 'Nov'
      day: 'numeric'
    });
  };

  return (
    <div className='claim-list'>
      <table>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Claim Date</th>
            <th>Claimer Email</th>
            <th>Amount Claimed</th>
            <th>
              <select value={filter} onChange={handleFilterChange}>
                <option value="All">Status</option>
                <option value="Pending">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map((claim) => (
            <React.Fragment key={claim.id}>
              <tr onClick={() => handleExpand(claim.id)} style={{ cursor: 'pointer' }}>
                <td>{claim.id}</td>
                <td>{formatDate(claim.claimDate)}</td> {/* Format the claimDate here */}
                <td>{claim.userEmail}</td>
                <td>₹ {claim.amountClaimed.toFixed(2)}</td>
                <td>{getStatusLabel(claim.status)}</td>
              </tr>
              {expandedClaimId === claim.id && (
                <tr>
                  <td colSpan="5" style={{ paddingLeft: '20px', paddingTop: '10px' }}>
                    <div className="expanded-remarks">
                      <h1>Admin Remarks</h1>
                      <p>{claim.adminRemarks}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

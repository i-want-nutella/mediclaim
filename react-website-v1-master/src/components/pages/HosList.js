import React, { useEffect, useState } from 'react';
import './HosList.css'; // Import CSS for styling

const HosList = () => {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [expandedClaimId, setExpandedClaimId] = useState(null);
  const [filter, setFilter] = useState('All'); // State to handle filter
  const [userDataMap, setUserDataMap] = useState({}); // State to store user data by email

  useEffect(() => {
    const fetchClaims = async () => {
      const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
      if (email) {
        const response = await fetch(`http://localhost:8090/claim/tp/${email}`);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          // Filter out claims that are 'Not Submitted' or have null status
          const validClaims = data.filter(claim => claim.status && claim.status !== 'Not Submitted');
          // Sort the claims by claim ID in ascending order
          const sortedData = validClaims.sort((a, b) => a.id - b.id);
          setClaims(sortedData); // Store the sorted array of valid claims
          setFilteredClaims(sortedData); // Initialize filtered claims with all valid claims
          fetchUserData(sortedData); // Fetch user data for each unique email in claims
        } else if (response.status === 404) {
          alert("Sorry, no records found");
          window.location.href = '/tpa';
        } else {
          console.error('Failed to fetch claims:', response.statusText);
        }
      } else {
        console.error('User email not found in local storage');
      }
    };

    const fetchUserData = async (claims) => {
      const uniqueEmails = [...new Set(claims.map(claim => claim.userEmail))];
      const userDataPromises = uniqueEmails.map(async (email) => {
        try {
          const response = await fetch(`http://localhost:8081/user?email=${email}`);
          if (response.ok) {
            const data = await response.json();
            return { email, data }; // Returning email and user data
          } else {
            console.error('Failed to fetch user data for email:', email, response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data for email:', email, error);
        }
      });

      const userDataResults = await Promise.all(userDataPromises);
      const userDataMap = userDataResults.reduce((acc, { email, data }) => {
        if (data) {
          acc[email] = { username: `${data.firstName} ${data.lastName}`, mobileNum: data.mobileNum };
        }
        return acc;
      }, {});

      setUserDataMap(userDataMap); // Store user data in the map
    };

    fetchClaims();
  }, []);

  const handleExpand = (id) => {
    setExpandedClaimId(expandedClaimId === id ? null : id);
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

  return (
    <div className='claim-list1'>
      <table>
        <thead>
          <tr>
            <th>Claim ID</th>
            <th>Patient's Email</th>
            <th>Amount Claimed</th>
            <th>Username</th>
            <th>Mobile Number</th>
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
          {filteredClaims.map((claim) => {
            const user = userDataMap[claim.userEmail] || { username: 'Loading...', mobileNum: 'Loading...' };
            return (
              <React.Fragment key={claim.id}>
                <tr onClick={() => handleExpand(claim.id)} style={{ cursor: 'pointer' }}>
                  <td>{claim.id}</td>
                  <td>{claim.userEmail}</td>
                  <td>₹ {claim.amountClaimed.toFixed(2)}</td>
                  <td>{user.username}</td>
                  <td>{user.mobileNum}</td>
                  <td>{getStatusLabel(claim.status)}</td>
                </tr>
                {/* Conditionally render admin remarks row when the claim is expanded */}
                {expandedClaimId === claim.id && (
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: '30px' }}>
                      <div>
                        <strong>Admin Remarks:</strong>
                        <p>{claim.adminRemarks}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HosList;

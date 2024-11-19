import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
    const [policies, setPolicies] = useState([]);
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        if (userEmail) {
            // API call to fetch the policy data
            axios.get(`http://localhost:8080/admin/check/${userEmail}`, {
                headers: {
                    'Authorization': 'Basic YWRtaW4xMjM6Y21z'
                }
            })
            .then(response => {
                setPolicies(response.data);
            })
            .catch(error => {
                console.error('Error fetching policies:', error);
            });
        }
    }, [userEmail]);

    return (
        <div className="customer-dashboard-container">
            {/* <h1>Your Enrolled Policies</h1> */}
            <div className="customer-policy-list">
                <div className="customer-policy-cards">
                    {policies.map((policy) => (
                        <div key={policy.id} className="customer-policy-card">
                            <h2>{policy.policyName}</h2>
                            <p>Remaining Amount: ₹{policy.amountRemaining.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="customer-functions">
            <div className="customer-function-card">
                    <Link to="/emply" className="customer-btn">
                        <img src="./images/1.png" className="customer-admin-icon"  />
                        <h3>Add Nominee</h3>
                        <p>Ensure your nominee benefits from your policy, securing their health and well-being</p>
                    </Link>
                </div>

                <div className="customer-function-card">
                    <Link to="/policylist" className="customer-btn">
                        <img src="./images/5.png" className="customer-admin-icon"  />
                        <h3>Enroll Policy</h3>
                        <p>Register for a new policy to receive health coverage benefits, ensuring you stay covered</p>
                    </Link>
                </div>

                <div className="customer-function-card">
                    <Link to="/userclaim" className="customer-btn">
                        <img src="./images/7.png" className="customer-admin-icon"  />
                        <h3>Submit Claims</h3>
                        <p>Submit a new claim request with all relevant details for quick processing and approval</p>
                    </Link>
                </div>

                <div className="customer-function-card">
                    <Link to="/user" className="customer-btn">
                        <img src="./images/6.png" className="customer-admin-icon"  />
                        <h3>View Claims</h3>
                        <p>View your claim history and track the current status of all submitted claims</p>
                    </Link>
                </div>

                <div className="customer-function-card-1">
                    <Link to="/hospitallist" className="customer-btn-1">
                        <img src="./images/4.png" className="customer-admin-icon"  />
                        <h3>Networking Hospitals</h3>
                        <p>View the list of networking hospitals that offer cashless medical service under MediClaim policies</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;

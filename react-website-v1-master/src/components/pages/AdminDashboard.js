import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <div className="main-content">
                    {/* <h1>Admin Nexus</h1> */}
                    <div className="functions">
                    <div className="function-card-1">
                        <Link to="/claimlist" className="btn">
                        <img src="./images/3.png" className="admin-icon" />
                        <h3>Approve Claims</h3>
                        <p>Review and either approve or deny claims submitted by users</p>
                        </Link>
                    </div>
                    <div className="function-card-1">
                        
                        <Link to="/products" className="btn">
                        <img src="./images/2.png" className="admin-icon" />
                        <h3>Add Policies</h3>
                        <p>Add new health policies to the database for users to choose from</p>
                        </Link>
                    </div>
                    <div className="function-card-1">
                        
                        <Link to="/services" className="btn">
                        <img src="./images/4.png" className="admin-icon" />
                        <h3>Add Hospitals</h3>
                        <p>Include hospitals in the network that offer cashless treatment</p>
                        </Link>
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';
import './TPADashboard.css';

const TPA = () => {
    return (
<div className='vrap'>
<div className="admin-dashboard">

            <div className="main-content">
                <div className="functions">
                <div className="function-card-1">
                        <Link to="/admit" className="btn">
                        <img src="./images/8.png" className="admin-icon" />
                        <h3>Admit Patient</h3>
                        <p>Verify a patient's policy for initiating the treatment process</p>
                        </Link>
                    </div>
                    <div className="function-card-1">
                        <Link to="/cashless" className="btn">
                        <img src="./images/9.png" className="admin-icon" />
                        <h3>Update Claims</h3>
                        <p>Update the details of admitted patients for claiming the bills</p>
                        </Link>
                    </div>
                    <div className="function-card-1">
                        <Link to="/hos" className="btn">
                        <img src="./images/6.png" className="admin-icon" />
                        <h3>View Claims</h3>
                        <p>View claims associated with hospital and check the status of submitted claims</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
</div>
    );
};

export default TPA;

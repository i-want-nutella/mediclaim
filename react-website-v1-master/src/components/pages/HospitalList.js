import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './HospitalList.css';

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/admin/hospitals', {
      headers: {
        'Authorization': 'Basic YWRtaW4xMjM6Y21z'
      }
    })
    .then(response => {
      setHospitals(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the hospitals!', error);
    });
  }, []);

  return (
<div className='outershell'>
<h1>Networking Healthcare Providers</h1>
<div className='hospital-list'>
      {hospitals.map(hospital => (
        <div className='hospital-card-1' key={hospital.id}>
          <div className='hospital-name'><strong>{hospital.hospitalName}</strong></div>
          <div className='hospital-address'>{hospital.address}<br/><br/><h2>Contact us: {hospital.adminEmail}</h2></div>
        </div>
      ))}
    </div>
</div>
  );
};

export default HospitalList;

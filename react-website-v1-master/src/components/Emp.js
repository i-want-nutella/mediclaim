import axios from 'axios';
import React, { useState } from 'react';
import './Emp.css';

function Emp() {
  const [name, setNomineeName] = useState('');
  const [relation, setRelation] = useState('');

  const handleRelationChange = (event) => {
    setRelation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      alert('User email not found in local storage.');
      return;
    }

    const nomineeData = {
      name,
      relation,
    };
    console.log(`http://localhost:8081/nominee/${userEmail}/add`);
    console.log(nomineeData);

    try {
      const response = await axios.post(`http://localhost:8081/nominee/${userEmail}/add`, nomineeData);

      if (response.status === 201) {
        console.log('Nominee Name:', name);
        console.log('Relation:', relation);
        console.log('User Email:', userEmail);
        alert('Nominee added successfully.');
        window.location.href = '/customerdash';
      } else {
        alert('Failed to add nominee.');
      }
    } catch (error) {
      console.error('Error adding nominee:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="nominee-container">
      <form className="nominee-form" onSubmit={handleSubmit}>
        <div className="form-group">
        <h2>Secure Your Loved Ones</h2>
          <input
            type="text"
            placeholder="Nominee Name"
            value={name}
            onChange={(e) => setNomineeName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <select id="relation" value={relation} onChange={handleRelationChange}>
            <option value="" disabled>Select Relation</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Nominee</button>
      </form>
    <div className="nominee-bg"></div>
    <div className="nominee-bg-1"></div>
    <div className="nominee-bg-2">
    </div>
  </div>
  );
}

export default Emp;

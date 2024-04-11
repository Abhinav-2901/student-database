// InsertStudentsRecord.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsertStudentsRecord = () => {
  const [formData, setFormData] = useState({
    enrollmentNumber: '',
    facultyNumber: '',
    name: '',
    address: '',
    hall: '',
    course: '',
    branch: '',
    semester: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          setSuccessMessage('Student record added successfully');
          setErrorMessage('');
        } else {
          setErrorMessage('Failed to add student record');
          setSuccessMessage('');
        }
      })
      .catch(error => {
        console.error('Error adding student record:', error);
        setErrorMessage('Failed to add student record');
        setSuccessMessage('');
      });
  };

  const handleAddAnother = () => {
    setFormData({
      enrollmentNumber: '',
      facultyNumber: '',
      name: '',
      address: '',
      hall: '',
      course: '',
      branch: '',
      semester: ''
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <h2>Insert Students Record</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enrollment Number:
          <input type="text" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Faculty Number:
          <input type="text" name="facultyNumber" value={formData.facultyNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          Hall:
          <input type="text" name="hall" value={formData.hall} onChange={handleChange} />
        </label>
        <br />
        <label>
          Course:
          <input type="text" name="course" value={formData.course} onChange={handleChange} />
        </label>
        <br />
        <label>
          Branch:
          <input type="text" name="branch" value={formData.branch} onChange={handleChange} />
        </label>
        <br />
        <label>
          Semester:
          <input type="text" name="semester" value={formData.semester} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {successMessage && (
        <div>
          <p>{successMessage}</p>
          <button onClick={handleAddAnother}>Add Another Record</button>
          <button onClick={handleGoHome}>Go to Home Page</button>
        </div>
      )}
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
          <button onClick={handleSubmit}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default InsertStudentsRecord;

// ShowStudentsData.js

import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';

const ShowStudentsData = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:5000/students')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the received data
        setStudents(data);
      })
      .catch(error => console.error('Error fetching students:', error));
  };

  const handleDelete = (enrollment_number) => {
    fetch(`http://localhost:5000/students/${enrollment_number}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log(`Student with enrollment number ${enrollment_number} deleted successfully.`);
          // Refresh the list of students after deletion
          fetchStudents();
        } else {
          console.error('Failed to delete student:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  return (
    <div>
      <h2>Show Students Data</h2>
      <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Enrollment Number</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Faculty Number</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Address</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Hall</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Course</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Branch</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Semester</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.enrollment_number}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.enrollment_number}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.faculty_number}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.address}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.hall}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.course}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.branch}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{student.semester}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <DeleteButton onClick={() => handleDelete(student.enrollmentNumber)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowStudentsData;

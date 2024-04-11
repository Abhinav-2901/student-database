// SearchStudentRecord.js

import React, { useState, useEffect } from 'react';

const SearchStudentRecord = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    fetchSearchOptions();
  }, []);

  const fetchSearchOptions = () => {
    fetch('http://localhost:5000/students/search-options')
      .then(response => response.json())
      .then(data => {
        setSearchOptions(data);
      })
      .catch(error => console.error('Error fetching search options:', error));
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchValue(''); // Reset search value when search term changes
  };

  const handleValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send search request to backend API
    fetch(`http://localhost:5000/students/search?searchTerm=${searchTerm}&searchValue=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => console.error('Error searching students:', error));
  };

  return (
    <div>
      <h2>Search Student Record</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Search Term:
          <select value={searchTerm} onChange={handleChange}>
            <option value="">Select...</option>
            {searchOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <br />
        {searchTerm && (
          <label>
            Enter Search Value:
            <input type="text" value={searchValue} onChange={handleValueChange} />
          </label>
        )}
        <br />
        <button type="submit" disabled={!searchTerm}>Search</button>
      </form>
      {searchResults.length > 0 && (
        <table style={{ borderCollapse: 'collapse', border: '1px solid black', marginTop: '20px' }}>
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
            </tr>
          </thead>
          <tbody>
            {searchResults.map(student => (
              <tr key={student.enrollmentNumber}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.enrollment_number}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.faculty_number}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.name}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.address}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.hall}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.course}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.branch}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SearchStudentRecord;

import React, { useState } from 'react';
import "./AddCourseDetails.css"
import axios from 'axios'; // Assuming axios is installed
import { useParams } from 'react-router-dom';
const AddCourseDetails = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDetails, setCourseDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams()
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    setIsLoading(true);
    setErrorMessage(''); // Clear any previous error message

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/teacher/addcoursedetails/${id}`, {
        courseName,
        courseDetails,
      });

      if (response.data.userId) {
        // Handle successful submission (e.g., display success message, redirect)
        console.log('Course details added successfully!');
        // You can add your custom success handling logic here
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      setErrorMessage('Network issue or other error occurred.');
      console.error('Error adding course details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='add-course-details' onSubmit={handleSubmit}>
      <h2 >Add Course Details</h2>
      <div className="form-group">
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          name="courseName"
          value={courseName}
          onChange={(event) => setCourseName(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="courseDetails">Course Description:</label>
        <textarea
          id="courseDetails"
          name="courseDetails"
          value={courseDetails}
          onChange={(event) => setCourseDetails(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Course'}
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default AddCourseDetails;

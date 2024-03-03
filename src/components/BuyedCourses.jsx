import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BuyedCourses() {
  const [courseDetails, setCourseDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/student/buyedcourse/${id}`);
        const data = await response.json();
        setCourseDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  return (
    <div>
      {loading && <p className='loading'>Loading courses...</p>}
      {error && <p className='error'>Error fetching courses: {error}</p>}
      {courseDetails.length > 0 && (
        <ul className='course-list'>
          {courseDetails.map((course) => (
            <li className='course-item' key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button>See Analysis</button>
            </li>
          ))}
        </ul>
      )}
      {courseDetails.length === 0 && <p>No courses found.</p>}
    </div>
  );
}

export default BuyedCourses;
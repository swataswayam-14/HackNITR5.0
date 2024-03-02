import React, { useState, useEffect } from 'react';
import "./AllCourses.css"
import { useNavigate } from 'react-router-dom';
function AllCourses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email , setEmail] = useState('')

  async function BuyCourse(){

  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/student/allcourse');
        const data = await response.json();
        setCourses(data.allcourse);
      } catch (error) {
        setError('Network issue');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  const requestBody = {
    email:email
  }

  async function handleClick(course){
    try {
        const response = await fetch(`http://localhost:3000/api/v1/student/buycourse/${course.name}`, {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        if(!response.ok){
            throw new Error('HTTP error ' + response.status);
        }
        navigate(`/buycourse/${course._id}`)
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className='courses-container'>
      {loading && <h2 className='loading-message'>Loading courses...</h2>}
      {error && <h2 className='error-message'>Error: {error}</h2>}
      {!loading && !error && (
        <ul className='course-list'>
          {courses.map((course) => (
            <li className='course-item' key={course._id}>
              <h3 className='course-name'>{course.name}</h3>
              <p className='course-description'>{course.description}</p>
              <input onChange={(e) => setEmail(e.target.value)} />Enter email to buy the course:
              <button onClick={()=>{
                handleClick(course)
              }}>Get Enrolled</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllCourses;

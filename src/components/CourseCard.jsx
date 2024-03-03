import React from 'react';
import "./CourseCard.css"
import { useNavigate } from 'react-router-dom';
const CourseCard = ({ course }) => {
  const navigate  = useNavigate()
  return (
    <div className="course-card">
      <img src={course.imageUrl} alt={course.title} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button onClick={()=>{
        navigate('/lectures')
      }}>View Details</button>
    </div>
  );
};

export default CourseCard;

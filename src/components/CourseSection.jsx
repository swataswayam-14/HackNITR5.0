import React from 'react';
import CourseCard from './CourseCard'; // Import CourseCard component
import "./CourseSection.css"
import { useNavigate } from 'react-router-dom';
const CourseSection = ({ courses }) => {
  const navigate = useNavigate()
  return (
    <div className="course-section">
      <h2>Your Courses</h2>
      <div className="course-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseSection;

import React from 'react';
import StudentCard from './StudentCard'; // Import CourseCard component
import "./CourseSection.css"
const TeacherStudents = ({ students }) => {
  return (
    <div className="course-section">
      <h2>Your Students</h2>
      <div className="course-grid">
        {students.map((student) => (
          <StudentCard key={student.id} students={student} />
        ))}
      </div>
    </div>
  );
};

export default TeacherStudents;

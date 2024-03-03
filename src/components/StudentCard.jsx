import React from 'react';

const StudentCard = ({ students }) => {
  return (
    <div className="course-card">
      <h3>{students.name}</h3>
      <button>View Details</button>
    </div>
  );
};

export default StudentCard;

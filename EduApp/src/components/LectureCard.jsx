import React from 'react';
import "./LectureCard.css"
const LectureCard = ({ title, description }) => {
  return (
    <div className="lecture-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Check analysis</button>
    </div>
  );
};

export default LectureCard;

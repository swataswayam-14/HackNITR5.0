import React from 'react';
import LectureCard from './LectureCard';
import "./LectureComponent.css"
const lectures = [
  { title: 'Introduction to React', description: 'Learn the basics of React development' },
  { title: 'Building User Interfaces with React', description: 'Create dynamic and interactive UIs' },
  { title: 'Managing State in React Applications', description: 'Understand state management techniques' },
];

const LectureComponent = () => {
  return (
    <div className="lectures-container">
      {lectures.map((lecture) => (
        <LectureCard key={lecture.title} title={lecture.title} description={lecture.description} />
      ))}
    </div>
  );
};

export default LectureComponent;

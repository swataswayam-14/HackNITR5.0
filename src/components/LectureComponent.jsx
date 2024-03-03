import React, { useState, useEffect } from 'react';
import LectureCard from './LectureCard';
import { useParams } from 'react-router-dom';
import "./LectureComponent.css";

const LectureComponent = () => {
  const [lectures, setLectures] = useState([]);
  const [error, setError] = useState(null);
  const {id} = useParams()
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/teacher/getcourses/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLectures(data.courses);
      } catch (error) {
        setError('There is some problem in the server');
      }
    };

    fetchLectures();
  }, [id]); // Dependency array to trigger fetch on id change

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="lectures-container">
      {lectures.map((lecture) => (
        <LectureCard key={lecture.name} title={lecture.name} description={lecture.description} />
      ))}
    </div>
  );
};

export default LectureComponent;

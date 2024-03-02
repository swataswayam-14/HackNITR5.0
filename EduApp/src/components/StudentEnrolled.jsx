import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./StudentCard.css"

const StudentCard = ({ student }) => {
  // Destructure student data
  const { name, email, id, phoneno } = student;

  return (
    <div className="student-card">
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Phone np: {phoneno}</p>
      <button>See Analysis</button>
    </div>
  );
};

const StudentEnrolled = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {id} = useParams()
  useEffect(() => {
    console.log(id);
    const fetchStudents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/api/v1/teacher/coursestudents/${id}`);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [id]);

  if (isLoading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="students-list">
      {students.map((student) => (
        <StudentCard key={student._id} student={student} />
      ))}
    </div>
  );
};

export default StudentEnrolled;

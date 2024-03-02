import React from 'react';
import "./LandingPage.css"
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="landing-page">
      {/* Center the content horizontally and vertically */}
      <div className="content-wrapper">
        <h1>Welcome to Our Platform!</h1>
        <p>
          This platform provides a space for both students and teachers to connect and learn. Whether you're looking to expand your knowledge or share it with others, you've come to the right place.
        </p>
        <div className="button-container">
          <button onClick={()=>{
            navigate('/studentlandingpage')
          }} clasisName="student-button">Proceed as Student</button>
          <button onClick={()=>{
            navigate('/teacherlandingpage')
          }} className="teacher-button">Proceed as Teacher</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

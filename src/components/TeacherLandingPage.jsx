import React from 'react';
import './TeacherLandingPage.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TeacherLandingPage = () => {
  const navigate = useNavigate()
  const [isSigninActive, setIsSigninActive] = useState(true);

  const handleButtonClick = (buttonName) => {
    setIsSigninActive(buttonName === 'signin');
  };

  return (
    <div className="buttons-container">
      <button
        className={`button ${isSigninActive ? 'active' : ''}`}
        onClick={()=>{
            navigate('/teachersignin')
        }}
      >
        Teacher Sign In
      </button>
      <button
        className={`button ${!isSigninActive ? 'active' : ''}`}
        onClick={() => {
            navigate('/teachersignup')
        }}
      >
        Teacher Sign Up
      </button>
    </div>
  );
};

export default TeacherLandingPage;

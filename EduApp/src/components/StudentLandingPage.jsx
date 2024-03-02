import React from 'react';
import "./StudentLandingPage.css"
import { useNavigate } from 'react-router-dom';
const Button = ({ children, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

const StudentLandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="auth-buttons">
      <Button onClick={() =>{
        navigate('/studentsignin')
      }}>Student Sign In</Button>
      <Button onClick={() =>{
        navigate('/studentsignup')
      }}>Student Sign Up</Button>
    </div>
  );
};

export default StudentLandingPage;

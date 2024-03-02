import React, { useState, useRef, useEffect } from 'react';
import './TeacherSignUp.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const StudentSignup = () => {
  const [phoneno, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const formRef = useRef(null);
  const requestBody = {
    username,
    password,
    email,
    phoneno
  }
  const  handleSubmit = async(e) => {

    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log('Form submitted:', { phoneno, username, password, email });
    try {
        const response = await fetch('http://localhost:3000/api/v1/student/signup',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(requestBody)
        })
        if(!response.ok){
          throw new Error('Network issue occurred')
        }
        const json = await response.json()
        const id = json.userId
        navigate(`/student/${id}`)
        resetForm();
      } catch (error) {
        console.log(error);
      }
  };

  const resetForm = () => {
    setPhoneNumber('');
    setUsername('');
    setPassword('');
    setEmail('');
  };

  useEffect(() => {
    const form = formRef.current;
    const inputs = form.querySelectorAll('input');

    inputs.forEach((input) => {
      input.addEventListener('focus', handleInputFocus);
      input.addEventListener('blur', handleInputBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', handleInputFocus);
        input.removeEventListener('blur', handleInputBlur);
      });
    };
  }, []);

  const handleInputFocus = (e) => {
    e.target.parentElement.classList.add('focused');
  };

  const handleInputBlur = (e) => {
    e.target.parentElement.classList.remove('focused');
  };

  return (
    <div className="signup-container" ref={formRef}>
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="phone-number">Phone Number</label>
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            value={phoneno}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default StudentSignup

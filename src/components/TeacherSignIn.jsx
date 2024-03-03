import { useNavigate } from "react-router-dom";
import "./TeacherSignIn.css"
import React, { useState, useRef, useEffect } from 'react';

const TeacherSignIn = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const formRef = useRef(null);
  const requestBody = {
    password,
    email
  }
  const  handleSubmit = async(e) => {

    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log('Form submitted:', {password, email });
    try {
        const response = await fetch('http://localhost:3000/api/v1/teacher/signin',{
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
        console.log(json)
        const id = json.userId
        navigate(`/teacher/${id}`)
        resetForm();
      } catch (error) {
        console.log(error);
      }
  };

  const resetForm = () => {
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
      <h1 className="signup-title">Sign In</h1>
      <form onSubmit={handleSubmit} className="signup-form">
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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default TeacherSignIn;

import React, { useState } from 'react';
import "./TeacherProfile.css"
import { useNavigate, useParams } from 'react-router-dom';
const TeacherProfile = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [email ,setEmail] = useState('')
  const [username, setUsername] = useState('')
  async function getDetails(){
    try {
        const response = await fetch(`http://localhost:3000/api/v1/teacher/profile/${id}`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          },
        })
        if(!response.ok){
          throw new Error('Network issue occurred')
        }
        const data = await response.json()
        setEmail(data.email)
        setUsername(data.username)
      } catch (error) {
        console.log(error);
      }
  }
  getDetails()
  return (
    <div className="teacher-profile">
        <h2 className="teacher-name">Teacher Profile</h2>
        <p className="teacher-username"><b>Username:</b> {username}</p>
        <p className="teacher-email"><b>Email:</b> {email}</p>

        <div className="button-container">
        <button onClick={() => navigate('/teacherstudent')} className="see-student-details">
            See Student details
        </button>
        <button onClick={()=>{
            navigate(`/addcourse/${id}`)
        }} className="add-course-details">Add Course details</button>
        <button onClick={()=>{
            navigate(`/lectures/${id}`)
        }} className="add-course-details">View All Courses</button>
        </div>
    </div>
  );
};

export default TeacherProfile;

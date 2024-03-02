import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './components/LandingPage'
import StudentProfile from './components/StudentProfile'
import CourseSection from './components/CourseSection'
import {BrowserRouter as Router , Route, Routes} from "react-router-dom"
import { courses } from './components/courses'
import TeacherProfile from './components/TeacherProfile'
import { students } from './components/students'
import TeacherStudents from './components/TeacherStudents'
import LectureComponent from './components/LectureComponent'
import TeacherSignup from './components/TeacherSignUp'
import TeacherSignIn from './components/TeacherSignIn'
import TeacherLandingPage from './components/TeacherLandingPage'
import StudentLandingPage from './components/StudentLandingPage'
import StudentSignIn from './components/StudentSignIn'
import StudentSignup from './components/StudentSignUp'
import AddCourseDetails from './components/AddCourseDetails'
import AllCourses from './components/AllCourses'
import BuyCourse from './components/BuyCourse'
import StudentPlatform from './components/StudentPlatform'
import AnalysisTable from './components/Analysis'
import BuyedCourses from './components/BuyedCourses'
import StudentEnrolled from './components/StudentEnrolled'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path="/student" element={<StudentProfile/>}/>
      <Route path="/courses" element={<CourseSection courses = {courses}/>}/>
      <Route path = "/teacher/:id" element={<TeacherProfile/>}/>
      <Route path="/teacherstudent" element={<TeacherStudents students={students}/>}/>
      <Route path='/lectures/:id' element={<LectureComponent/>}/>
      <Route path='/teachersignup' element={<TeacherSignup/>}/>
      <Route path= '/teachersignin' element = {<TeacherSignIn/>}/>
      <Route path='/teacherlandingpage' element={<TeacherLandingPage/>}/>
      <Route path='/studentlandingpage' element={<StudentLandingPage/>}/>
      <Route path='/studentsignin' element={<StudentSignIn/>}/>
      <Route path='/studentsignup' element={<StudentSignup/>}/>
      <Route path='/student/:id' element={<StudentProfile/>}/>
      <Route path='/addcourse/:id' element={<AddCourseDetails/>}/>
      <Route path='/allcourse' element={<AllCourses/>}/>
      <Route path='/buycourse/:id' element={<BuyCourse/>}/>
      <Route path='/studentplatform/:id' element={<StudentPlatform/>}/>
      <Route path='/buyedcourses/:id' element={<BuyedCourses/>}/>
      <Route path='/studentpurchase/:id' element={<StudentEnrolled/>}/>
      </Routes>
    </Router>
  )
}

export default App

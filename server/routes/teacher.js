const express = require("express")
const TeacherRouter = express.Router()
const {Student, Teacher, Course} = require("../db/index")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const authMiddleWare = require("../authMiddleWare")
const signUpBody = zod.object({
    password: zod.string(),
    email: zod.string().email(),
    phoneno: zod.string(),
    username:zod.string()
})
TeacherRouter.post('/signup',async(req,res)=>{
    try{
        const {success} = signUpBody.safeParse(req.body)
        if(!success){
            return res.status(411).json({
                message:'Email already taken/ incorrect inputs'
            })
        }
        const email = req.body.email
        const phoneno = req.body.phoneno
        const password = req.body.password
        const username = req.body.username

        let isAlreadyExists = await Teacher.findOne({
            email
        })
        if(isAlreadyExists){
            return res.status(411).json({
                message: "Email already taken/ incorrect inputs"
            })
        }
        const teacher = await Teacher.create({
            email,
            password,
            username,
            phoneno
        })
        const user_id = teacher._id
        const token = jwt.sign({
            user_id
        },"secret")
        return res.json({
            message:'Farmer account created successfully',
            token:token,
            teacher:teacher.username,
            userId:teacher._id
        })
    }catch(e){
        return res.json({
            message:"there is some problem, please try again later"
        })
    }  
})


TeacherRouter.post('/signin',async(req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
    
        const teacher = await Teacher.findOne({
            email,
            password
        })
        if(teacher){
            const user_id = teacher._id
            const token = jwt.sign({
                user_id
            },"secret")
            console.log('signin success!');
        
            return res.status(200).json({
                token:token,
                teacher:teacher.username,
                userId:teacher._id
            })
            
        }
    } catch (error) {
        return res.status(411).json({
            message:'Error while logging in'
        })
    }
})

TeacherRouter.get('/profile/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const teacher = await Teacher.findById(id)
        if(teacher){
            return res.json({
                username: teacher.username,
                email:teacher.email
            })
        }
    } catch (error) {
        return res.json({
            msg:'Network issue'
        })
    }
})

TeacherRouter.post('/addcoursedetails/:id', async(req,res)=>{
    try {
        const courseName = req.body.courseName
        const courseDetails = req.body.courseDetails
        const id = req.params.id

        const course = await Course.create({
            name:courseName,
            description:courseDetails,
            Id1:id
        })
        if(course){
            return res.json({
                userId:id
            })
        }
    } catch (error) {
        return res.json({
            msg:"Network issue"
        })
    }
})


TeacherRouter.get('/getcourses/:id', async (req,res)=>{
    try {
        const id = req.params.id
        const courses = await  Course.find({
            Id1:id
        })
        if(courses){
            console.log(courses);
            return res.json({
                courses
            })
        }else{
            return res.json({
                msg:'There is no course available for this teacher'
            })
        }
    } catch (error) {
        return res.json({
            msg:'There is some problem  in server'
        })
    }
})

TeacherRouter.get('/coursestudents/:title', async (req, res) => {

    try {
        console.log('request came');
        const course = await Course.findOne({ name: req.params.title }); // Find the course by name
        const students = await Student.find({ buyedCourse: course._id }); // Find students who bought the course
        console.log(students);
        res.send(students); // Send the filtered students in response
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

module.exports = TeacherRouter

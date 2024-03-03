const express = require("express")
const StudentRouter = express.Router()
const {Student, Course} = require("../db/index")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const authMiddleWare = require("../authMiddleWare")
const signUpBody = zod.object({
    password: zod.string(),
    email: zod.string().email(),
    phoneno: zod.string(),
    username:zod.string()
})
StudentRouter.post('/signup',async(req,res)=>{
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

        let isAlreadyExists = await Student.findOne({
            email
        })
        if(isAlreadyExists){
            return res.status(411).json({
                message: "Email already taken/ incorrect inputs"
            })
        }
        const student = await Student.create({
            email,
            password,
            username,
            phoneno
        })
        const user_id = student._id
        const token = jwt.sign({
            user_id
        },"secret")
        return res.json({
            message:'Farmer account created successfully',
            token:token,
            student:student.username,
            userId:student._id
        })
    }catch(e){
        return res.json({
            message:"there is some problem, please try again later"
        })
    }  
})


StudentRouter.post('/signin',async(req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
    
        const student = await Student.findOne({
            email,
            password
        })
        if(student){
            const user_id = student._id
            const token = jwt.sign({
                user_id
            },"secret")
        
            return res.status(200).json({
                token:token,
                student:student.username,
                userId:student._id
            })
        }
    } catch (error) {
        return res.status(411).json({
            message:'Error while logging in'
        })
    }
})


StudentRouter.get('/profile/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const student = await Student.findById(id)
        if(student){
            return res.json({
                username: student.username,
                email:student.email
            })
        }
    } catch (error) {
        return res.json({
            msg:'Network issue'
        })
    }
})

StudentRouter.get('/allcourse',async(req,res)=>{
    try {
        const allcourse = await Course.find()
        if(allcourse){
            return res.json({
                allcourse
            })
        }
    } catch (error) {
        return res.json({
            msg:'Network issue'
        })
    }
})

StudentRouter.post('/buycourse/:name', async(req,res)=>{
    try {
        const name = req.params.name
        const course = await Course.findOne({
            name:name
        })
        if(course){
            const email = req.body.email
            const student = await Student.findOneAndUpdate(
                { email },
                {
                  $push: { buyedCourse: course._id}
                },
                { new: true }
              );
            console.log(student);
        }
    } catch (error) {
        return res.json({
            msg:'Network issue'
        })
    }
})

StudentRouter.get('/buyedcourse/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('buyedCourse');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        const courses = student.buyedCourse.map(course => course._id);
        
        const courseDetails = await Course.find({ _id: { $in: courses } });
        console.log(courseDetails);
        res.status(200).json({
            courseDetails,
            id:student._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = StudentRouter

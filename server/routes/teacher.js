const express = require("express")
const TeacherRouter = express.Router()
const {Student, Teacher} = require("../db/index")
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


module.exports = TeacherRouter

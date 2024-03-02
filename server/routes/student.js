const express = require("express")
const StudentRouter = express.Router()
const {Student} = require("../db/index")
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

module.exports = StudentRouter

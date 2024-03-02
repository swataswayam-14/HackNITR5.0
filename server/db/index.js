const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://paplu:papludash@cluster0.iyduksp.mongodb.net/edtech-app')

const StudentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    phoneno : {
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    username:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    buyedCourse: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course' // Reference to the Course model
    }
})

const TeacherSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    phoneno : {
        type:String,
        required:true,
        trim:true,
        maxLength:10
    },
    username:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})

const LectureSchema = new mongoose.Schema({
    id1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    id2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    lectureLink:{
        type:String,
        required:true
    }
})

const CourseSchema = new mongoose.Schema({
    Id1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type: String,
        required:true
    }
})

const Student = mongoose.model('Student', StudentSchema)
const Course = mongoose.model('Course',CourseSchema)
const Teacher = mongoose.model('Teacher',TeacherSchema)
const Lecture = mongoose.model('Lecture', LectureSchema)
module.exports = {
    Student,
    Course,
    Teacher,
    Lecture
}
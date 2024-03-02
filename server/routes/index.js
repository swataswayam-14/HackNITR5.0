const express = require("express")

const StudentRouter = require("./student")
const TeacherRouter = require("./teacher")
const rootRouter = express.Router()

rootRouter.use('/student', StudentRouter)
rootRouter.use('/teacher',TeacherRouter)

module.exports = rootRouter
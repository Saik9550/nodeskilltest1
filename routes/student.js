const express = require("express")
const router = express.Router()
const { renderForm } = require("../controllers/addStudentController")

// route to add the student
router.get("/add-student", renderForm)

module.exports = router

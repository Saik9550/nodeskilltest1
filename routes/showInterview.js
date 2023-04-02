// Route to display a list of all interviews and a form to create a new interview
const express = require("express")
const router = express.Router()

const interviewController = require("../controllers/ShowInterviewController")

router.get("/show-interview", interviewController.getInterviews)
router.post("/update/:studentId", interviewController.updateInterviewResult)

// Controller function to display a list of all interviews and a form to create a new interview

module.exports = router

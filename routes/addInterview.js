const express = require("express")
const router = express.Router()

const interviewController = require("../controllers/inteviewController")

// Route to render the form for adding a new interview
router.get("/add-interview", interviewController.renderForm)

// Route to handle the submission of the new interview form
router.post("/add-interview", interviewController.addInterview)

module.exports = router

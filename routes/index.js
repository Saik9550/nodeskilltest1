const express = require("express")
const router = express.Router()
const passport = require("passport")

const viewStudent = require("../controllers/ViewStudentsController")
router.get("/", passport.checkAuthentication, viewStudent.viewStudent)
router.use("/users", require("./usersLogin"))

router.use("/students", require("./addStudent"))
router.use("/export", require("./exportFile"))

// Route to render the form for adding a new interview
router.use("/interviews", require("./addInterview"))
router.use("/interviews", require("./showInterview"))
module.exports = router

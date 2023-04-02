// Controller function to show the details of a specific interview
const { Student } = require("../models/student")
module.exports.getInterviews = async function (req, res) {
  try {
    const students = await Student.find()

    res.render("interviews", { students })
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal server error in displaying interviews")
  }
}

// Controller function to update interview result
module.exports.updateInterviewResult = async function (req, res) {
  console.log(req.params.studentId)
  const { result } = req.body
  const studentId = req.params.studentId

  try {
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).send("Student not found")
    }

    student.interviews.result = result
    await student.save()
    const students = await Student.find()

    res.render("interviews", { students })
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal server error in updating interview result")
  }
}

const { Student } = require("../models/student")
// Controller function to render the add interview form
module.exports.renderForm = async function (req, res) {
  try {
    const students = await Student.find()
    res.render("addInterview", { students })
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal server error in rendering form")
  }
}

// Controller function to handle the submission of the new interview form
module.exports.addInterview = async function (req, res) {
  // console.log(req)
  try {
    const { students, company, date } = req.body
    console.log(students)

    // Create a new interview object
    const interview = { company, date, result: "On Hold" }

    // Find the student by ID and add the interview to their interviews array
    const studentsid = await Student.find({ _id: { $in: students } })
    studentsid.forEach(async (student) => {
      if (!student.interviews) {
        student.interviews = {
          company: interview.company,
          date: interview.date,
          result: interview.result,
        }
      } else {
        student.interviews.company = interview.company
        student.interviews.date = interview.date
        student.interviews.result = interview.result
      }
      await student.save()
    })

    res.redirect("/")
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal server error in adding interview")
  }
}
